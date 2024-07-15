"use client"
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { useState } from "react"
import { CreateSlide, UpdateSlide } from "@/app/action"
import { getSignedURL } from "@/utils/aws/requests"
import { Progress } from "./ui/progress"
import { useRouter } from "next/navigation"

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import Link from "next/link"


const formSchema = z.object({
  name: z.string(),
  file: z.string(),
})

type Props = {
  spaceId: string
}
export function UploadModal(props: Props) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file: "",
    },
  })

  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [slideId, setSlideId] = useState("")
  const { push, refresh } = useRouter()
  const [hasError, setHasError] = useState(false)
  const [errorText, setErrorText] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [progressText, setProgressText] = useState("Uploading...")

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
  }

  const handleUpload = async (file: File, slideId: string) => {
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
      slideId: slideId
    })
    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure)
    }
    const { url } = signedURLResult.success
    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    })
  }


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const onUpload = () => {
    console.log('uploading')
    console.log(form.getValues())
    // VAlidate pdf and type
    if (!form.getValues().name) {
      setHasError(true)
      setErrorText('Please enter a name for the file.')
      return
    }
    if (!form.getValues().file) {
      setHasError(true)
      setErrorText('Please select a file to upload.')
      return
    }
    if (!file) {
      setHasError(true)
      setErrorText('Please select a file to upload.')
      return
    }
    if (file.type !== 'application/pdf') {
      setHasError(true)
      setErrorText('Please select a PDF file.')
      return
    }

    setHasError(false)

    setIsUploading(true)
    console.log('uploading')
    console.log(form.getValues())
    handleCreateSlide()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.type !== 'application/pdf') {
        setHasError(true)
        setErrorText('Please select a PDF file.')
        return
      }
      setHasError(false)
      setFile(file)
      form.setValue('file', file.name)
    }
  }

  const handleCreateSlide = async () => {
    console.log('Creating slide');

    const name = form.getValues().name;
    const space_id = props.spaceId;
    const data = { name, space_id };

    try {
      const res_c = await CreateSlide(data);
      setProgress(10);

      if (res_c.status_code !== 200) {
        throw new Error('Error creating slide. Please refresh and try again.');
      }

      console.log("Slide created successfully", res_c);
      const InsertedID = res_c.result.InsertedID;
      console.log(InsertedID);
      setSlideId(InsertedID);

      const res_uf = await handleUpload(file as File, InsertedID);
      setProgress(30);
      console.log('File upload result:', res_uf);

      const fileUrl = res_uf.url.split("?")[0];
      console.log(fileUrl);

      const slideData = {
        id: InsertedID,
        name,
        pdf_url: fileUrl,
        space_id
      };

      console.log(slideData);

      const res_us = await UpdateSlide(slideData);

      if (res_us.status_code === 200 && res_us.result.ModifiedCount === 1) {
        console.log("Slide updated successfully", res_us);
        setProgress(50);

        // SSE for PDF to images conversion
        const eventSource = new EventSource(`${process.env.SERVER_URL!}/convert-pdf-to-images/${InsertedID}`);

        let totalImages = 0;
        let processedImages = 0;

        eventSource.onmessage = function (event) {
          console.log("Event received:", event.data);

          if (event.data === "[DONE]") {
            setProgress(70);
            eventSource.close();

            // Start generating text for all images
            const textEventSource = new EventSource(`${process.env.SERVER_URL!}/generate-all-image-text/${InsertedID}`);

            let totalTexts = 0;
            let processedTexts = 0;

            textEventSource.onmessage = function (event) {
              console.log("Event received:", event.data);

              if (event.data === "[DONE]") {
                setProgress(100);
                textEventSource.close();
                push(`/slides/${InsertedID}`);
              } else {
                try {
                  const parsedData = JSON.parse(event.data);
                  if (parsedData.totalImages) {
                    totalTexts = parsedData.totalImages;
                    console.log(`Total images to process: ${totalTexts}`);
                  } else if (parsedData.processedImage) {
                    processedTexts += 1;
                    console.log(`Processed image text ${processedTexts} of ${totalTexts}`);
                    const progress = 70 + ((processedTexts / totalTexts) * 30);
                    setProgress(progress);
                    setProgressText(`Generating notes... ${processedTexts}/${totalTexts}`)
                  }
                } catch (e) {
                  console.log("Progress update:", event.data);
                }
              }
            };

            textEventSource.onerror = function (err) {
              console.error("EventSource failed:", err);
              setHasError(true);
              setErrorText("Error generating text for images. Please refresh and try again.");
              textEventSource.close();
            };
          } else {
            try {
              const parsedData = JSON.parse(event.data);
              if (parsedData.totalImages) {
                totalImages = parsedData.totalImages;
                console.log(`Total images to process: ${totalImages}`);
              } else if (parsedData.processedImage) {
                processedImages += 1;
                console.log(`Processed image ${processedImages} of ${totalImages}`);
                const progress = 50 + ((processedImages / totalImages) * 20);
                setProgress(progress);
              }
            } catch (e) {
              console.log("Progress update:", event.data);
            }
          }
        };

        eventSource.onerror = function (err) {
          console.error("EventSource failed:", err);
          setHasError(true);
          setErrorText("Error converting pdf to images. Please refresh and try again. If the slide is created but empty or if there are missing slides (at the end), please delete it and try again.");
          eventSource.close();
        };
      } else {
        throw new Error('Error saving slide. Please refresh and try again. If the slide is created but empty or if there are missing slides (at the end), please delete it and try again.');
      }
    } catch (error: any) {
      setHasError(true);
      setErrorText(error.message);
      console.log(error);
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Slide PDF</DialogTitle>
          {
            progress === 0 &&
            <DialogDescription>
              Upload a PDF file to create a slide
            </DialogDescription>
          }
          {
            progress === 100 &&
            <DialogDescription>
              PDF processed successfully
            </DialogDescription>
          }
        </DialogHeader>
        {
          progress === 0 ?
            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a file name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input
                            onChange={handleOnChange}
                            type="file"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button type="submit" className="w-full mt-2" onClick={onUpload} disabled={isUploading || form?.getValues()?.name == ''}>
                  Generate
                </Button>

              </form>
            </Form>
            :
            <>
              <><Progress value={Math.round(progress * 10) / 10} />{Math.round(progress * 10) / 10}%</>
              {
                progress > 0 && progress < 100 &&
                <>
                  <p>{progressText}</p>
                  <p>This can take up to a couple minutes 🙂</p>
                </>
              }
              {
                progress > 75 &&
                <>
                  <Link href={`/slides/${slideId}`}>
                    <Button variant="outline" onClick={() => form.reset()} className="w-full">View</Button>
                  </Link>
                </>
              }
            </>
        }
        {
          hasError &&
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {errorText}
            </AlertDescription>
          </Alert>
        }
      </DialogContent>
    </Dialog>
  )
}
