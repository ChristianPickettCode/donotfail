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
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ConvertPdfToImages, CreateSlide, GenerateAllAudioForSlide, GenerateAllImageText, UpdateSlide } from "@/app/action"
import { getSignedURL } from "@/utils/aws/requests"
import { Progress } from "./ui/progress"
import { Link } from "lucide-react"
import { useRouter } from "next/navigation"

import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


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
  const [isUploading, setIsUploading] = useState(false)

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
    setIsUploading(true)
    console.log('uploading')
    console.log(form.getValues())
    handleCreateSlide()
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files) {
      setFile(e.target.files[0])
      form.setValue('file', e.target.files[0].name)
    }

  }

  const handleCreateSlide = async () => {
    console.log('creating slide')
    const name = form.getValues().name
    const space_id = props.spaceId
    const data = {
      name,
      space_id
    }
    try {
      CreateSlide(data)
        .then((res_c) => {
          setProgress(15)
          console.log(res_c)
          const InsertedID = res_c.InsertedID
          console.log(InsertedID)
          handleUpload(file!, InsertedID)
            .then((res_uf) => {
              setProgress(30)
              console.log('res_c', res_uf)
              console.log('File upload result:', res_uf);
              const fileUrl = res_uf.url.split("?")[0]
              console.log(fileUrl)

              const d = {
                id: InsertedID,
                name: name,
                pdf_url: fileUrl,
                space_id: space_id
              } as any

              console.log(d)

              UpdateSlide(d)
                .then((res_us) => {

                  console.log(res_us)

                  if (res_us.ModifiedCount == 1) {
                    setProgress(45)
                    ConvertPdfToImages(InsertedID)
                      .then((res) => {
                        console.log(res)
                        if (res.status_code == 200) {
                          console.log(res)
                          setProgress(60)
                          GenerateAllImageText(InsertedID)
                            .then((res) => {
                              console.log(res)
                              setProgress(75)
                              if (res?.status == "success") {
                                GenerateAllAudioForSlide(InsertedID)
                                  .then((res) => {
                                    console.log(res);
                                    // setSlideImages(res.data);
                                    if (res?.status == "success") {
                                      console.log("Audio generated successfully");
                                      setProgress(100)
                                      push(`/spaces/${space_id}/${InsertedID}`)

                                    } else {
                                      console.log("Audio generation failed");
                                    }
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });

                              } else {
                                console.log(res)
                                refresh()
                              }

                            })
                            .catch((err) => {
                              console.log(err)
                            })
                        } else {
                          console.log(res)
                          setHasError(true)
                        }


                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  }

                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })



    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Choose a file to upload and give it a name.</DialogDescription>
        </DialogHeader>
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

            <Button type="submit" className="w-full mt-2" onClick={onUpload} disabled={isUploading}>
              Generate
            </Button>
          </form>
          <Progress value={progress} />
          {
            progress > 0 && progress < 100 && <p>This can take up to a couple minutes 🙂</p>
          }
          {
            progress == 100 && <Link href={`/spaces/${props.spaceId}/${slideId}`}>
              <Button variant="outline" onClick={() => form.reset()}>View</Button>
            </Link>
          }
          {
            hasError &&
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Error uploading file. Please refresh and try again. If the slide is created but empty or if their are missing slides (at the end) please delete it and try again.
              </AlertDescription>
            </Alert>
          }

        </Form>
      </DialogContent>
    </Dialog>
  )
}
