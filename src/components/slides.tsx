"use client"
import Vapi from "@vapi-ai/web";

import { useEffect, useState } from "react";
import { GenerateAllAudioForSlide, GenerateAllImageText, GetSlide, GetSlideImages, GenerateQuizForSlide, GetQuizQuestions, GetSpaces, GetSpaceSlides } from "@/app/action";
import { Button } from "./ui/button";
import { MenuIcon, Mic, MicOffIcon } from "lucide-react";
import 'react-photo-view/dist/react-photo-view.css';
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SlideImageSection from "./slideImageSection";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useToast } from "@/components/ui/use-toast"


const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY as string;
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID as string;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NavSmallMenu from "./NavSmallMenu";
import Link from "next/link";
import { ToastAction } from "./ui/toast";

type Props = {
  params: any
}

export function Slides(props: Props) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isVapiStarted, setIsVapiStarted] = useState(false);
  const [slideImages, setSlideImages] = useState<any[]>([]);
  const [slide, setSlide] = useState<any>({});
  const [spaceSlides, setSpaceSlides] = useState<any[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const [chatLog, setChatLog] = useState<any[]>([]);

  const [generatedAllSlideText, setGeneratedAllSlideText] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  const [audioIndex, setAudioIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const [QuizBtnDisabled, setQuizBtnDisabled] = useState(false);

  const [spaces, setSpaces] = useState<any[]>([])

  const [audioSpeed, setAudioSpeed] = useState(1.5)


  const { push, refresh } = useRouter()
  const { toast } = useToast()


  useEffect(() => {
    const vapi = new Vapi(VAPI_API_KEY);
    setVapi(vapi);

    const audio = new Audio();
    setAudioPlayer(audio);

    const handleEnded = () => {
      setAudioPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    GetSlideImages(props.params.slide_id)
      .then((res) => {
        // console.log(res);
        setSlideImages(res);
      })
      .catch((err) => {
        console.log(err);
      });

    GetSlide(props.params.slide_id)
      .then((res) => {
        console.log(res);
        setSlide(res);
      })

    GetQuizQuestions(props.params.slide_id)
      .then((res) => {
        console.log(res);
        if (res?.status == "success") {
          setQuizQuestions(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }, [props.params.slide_id]);

  const startVapi = () => {
    setChatLog([]);
    if (vapi) {
      // vapi.start({
      //   transcriber: {
      //     provider: "deepgram",
      //     model: "nova-2",
      //     language: "en-US",
      //   },
      //   model: {
      //     provider: "openai",
      //     model: "gpt-3.5-turbo",
      //     messages: [
      //       {
      //         role: "system",
      //         content: "You are a helpful assistant.",
      //       },
      //     ],
      //   },
      //   voice: {
      //     provider: "playht",
      //     voiceId: "jennifer",
      //   },
      //   name: "My Inline Assistant",
      // });

      // vapi.start("ed4c5eb8-d772-4f0f-be11-40502187e74d");
      vapi.start(VAPI_ASSISTANT_ID)

      vapi.on("volume-level", (volume) => {
        // console.log(`Assistant volume level: ${volume}`);
      });

      vapi.on("message", (message) => {
        console.log(message);
        if (message.type === "conversation-update") {
          console.log(message.content);
          const conv_reverse = message.conversation.reverse();
          setChatLog(conv_reverse)
        }
        if (message.type === "function-call") {
          console.log(message);
          if (message.functionCall.name = "move-to-slide") {
            console.log("move-to-slide")
            const slideNumber = message.functionCall.parameters.slideNumber
            console.log("slideNumber", slideNumber)
            const slideId = slideImages[slideNumber - 1]._id;
            document.getElementById(`s${slideNumber}`)?.scrollIntoView({ behavior: "smooth" });
          }

          // explain slide if slide has generated text
          if (message.functionCall.name = "explain-slide") {
            console.log("explain-slide")
            const slideNumber = message.functionCall.parameters.slideNumber
            console.log("slideNumber", slideNumber)
            const slideId = slideImages[slideNumber - 1]._id;
            const slideText = slideImages[slideNumber - 1].generated_text;
            if (slideText) {
              sendMsg(slideText);
            } else {
              console.log("Slide text not generated")
              if (vapi) {
                vapi.send({
                  type: "add-message",
                  message: {
                    role: "system",
                    content: "Sorry, I don't have notes for this slide. You would need to generate notes first."
                  },
                });

              }
            }
          }

        }
      });

      vapi.on("error", (e) => {
        console.error(e);
      });

      vapi.on("call-start", () => {
        console.log("Call has started.");
      });

      vapi.on("call-end", () => {
        console.log("Call has ended.");
        setIsVapiStarted(false);
      });

      vapi.on("speech-start", () => {
        console.log("Assistant speech has started.");
      });

      vapi.on("speech-end", () => {
        console.log("Assistant speech has ended.");
      });


      setIsVapiStarted(true);
    }
  };

  const stopVapi = () => {
    if (vapi) {
      vapi.stop();
      setIsVapiStarted(false);
    }
  }




  const sendMsg = (slideText: string) => {
    if (vapi) {
      const MSG = `
      Current Slide : \n
      ${slideText}
      `
      vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: MSG
        },
      });
    }
  }


  useEffect(() => {
    const slideNumber = window.location.hash.slice(2); // Extract the slide id from the URL
    console.log("slideNumber", slideNumber);
    const slideElement = document.getElementById(`s${slideNumber}`);
    if (slideElement) {
      slideElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the corresponding slide element
    }
    if (slideImages && slideImages.some(item => !item.generated_text)) {
      const fraction = 1 - slideImages.filter(item => !item.generated_text).length / slideImages.length;
      const title = `Notes are still being generated (${Math.round(fraction * 100)}% complete)`;
      toast({
        title: title,
        description: "Please reload the page in a minute to see the rest of the notes",
        duration: 5000,
      })
    }
  }, [slideImages]);

  const generateAllSlideText = () => {
    setGeneratedAllSlideText(true);
    console.log("Generating all slide text", props.params.slide_id);
    toast({
      title: "Generating all slide notes",
      description: "This might take a minute, please refresh if notes not showing",
      duration: 5000
    });

    // Establish SSE connection
    const eventSource = new EventSource(`${process.env.SERVER_URL!}/generate-all-image-text/${props.params.slide_id}`);

    eventSource.onmessage = function (event) {
      console.log("Event received:", event.data);

      if (event.data === "[DONE]") {
        toast({
          title: "Generation complete",
          description: "All slide notes have been generated.",
          duration: 5000
        });
        eventSource.close();
      } else {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData.status === "success") {
            setSlideImages(parsedData.data);
          } else {
            console.log("Progress update:", event.data);
            // Optionally, you can update the progress based on specific messages
          }
        } catch (e) {
          console.log("Progress update:", event.data);
        }
      }
    };

    eventSource.onerror = function (err) {
      console.error("EventSource failed:", err);
      toast({
        title: "Error",
        description: "An error occurred while generating slide notes. Please try again.",
        duration: 5000
      });
      eventSource.close();
    };
  };

  const generateAllAudio = () => {
    setGeneratedAllSlideText(true);
    console.log("Generating all audio", props.params.slide_id);
    toast({
      title: "Generating all note audio",
      description: "This might take a minute, please refresh if audio not showing",
      duration: 5000
    })
    GenerateAllAudioForSlide(props.params.slide_id)
      .then((res) => {
        console.log(res);
        // setSlideImages(res.data);
        if (res?.status == "success") {
          console.log("Audio generated successfully");
          refresh()

        } else {
          console.log("Audio generation failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const generateQuiz = () => {
    setQuizBtnDisabled(true); // Disable the button to prevent multiple clicks
    console.log("Generating quiz", props.params.slide_id);
    toast({
      title: "Generating quiz",
      description: "This might take up to a minute, please refresh if not redirected to quiz page",
      duration: 5000
    })
    GenerateQuizForSlide(props.params.slide_id)
      .then((res) => {
        console.log(res);
        // setSlideImages(res.data);
        if (res?.status == "success") {
          console.log("Quiz generated successfully");
          push(`/slides/${props.params.slide_id}/quiz`)

        } else {
          console.log("Quiz generation failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("GET SPACES", slide.space_id)
    // GetSlides()
    GetSpaceSlides(slide.space_id)
      .then((res) => {
        console.log('NEW', res)
        setSpaceSlides(res)
      })
      .catch((err) => {
        console.log(err)
      })

    GetSpaces()
      .then((res) => {
        console.log(res)
        setSpaces(res)
        // this space
        const space = res.find((space: any) => space.id === slide.space_id)
        setSelectedSpace(space)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [slide])


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="fixed top-2 right-4"><MenuIcon size={16} /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side='right'>
          <Link href={`/spaces/${slide.space_id}/${slide.id}`}>
            <DropdownMenuItem>
              Overview
            </DropdownMenuItem>
          </Link>
          {spaceSlides.length > 0 && selectedSpace &&
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>{selectedSpace?.name}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {/* {
                  spaces.map((space: any, index) => (
                    <Link key={index} href={`/spaces/${space.id}`}>
                      <DropdownMenuItem>
                        {space.name}
                      </DropdownMenuItem>
                    </Link>
                  ))
                } */}
                  {
                    spaceSlides.map((spaceSlide: any, index) => (
                      <Link key={index} href={`/slides/${spaceSlide?.id}`}>
                        <DropdownMenuItem>
                          {spaceSlide.name}
                        </DropdownMenuItem>
                      </Link>
                    ))
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          }

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Audio speed</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {
                  [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5].map((speed, index) => (
                    <DropdownMenuItem key={index} onClick={() => setAudioSpeed(speed)}>
                      {speed}x
                    </DropdownMenuItem>
                  ))
                }
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>





          {/* <Link href="/spaces">
            <DropdownMenuItem>
              Flashcards
            </DropdownMenuItem>
          </Link> */}

          {/* <Link href="/spaces">
                    <DropdownMenuItem>
                        Quizzes
                    </DropdownMenuItem>
                </Link> */}
          {/* 
          <Link href="/spaces">
            <DropdownMenuItem>
              Notes
            </DropdownMenuItem>
          </Link> */}

          {slideImages && slideImages.some(item => !item.generated_text) ? (
            <DropdownMenuItem onClick={generateAllSlideText} disabled={generatedAllSlideText}>Generate Notes</DropdownMenuItem>
          ) : null}

          {
            slideImages && slideImages.some(item => !item.audio_url) && slideImages.filter(item => !item.generated_text).length / slideImages.length < 0.75 ? (
              <DropdownMenuItem onClick={generateAllAudio} disabled={generatedAllSlideText}>Generate All Audio</DropdownMenuItem>
            ) : null}
          {
            quizQuestions && quizQuestions.length > 0 ? (
              <DropdownMenuItem onClick={() => push(`/slides/${props.params.slide_id}/quiz`)}>View Quiz</DropdownMenuItem>
            ) :
              slideImages && slideImages.some(item => !item.generated_text) ?
                null
                : <DropdownMenuItem onClick={generateQuiz} disabled={QuizBtnDisabled}>Generate Quiz</DropdownMenuItem>
          }

          <DropdownMenuItem onClick={() => setAutoPlay(true)}>Auto Play All Audio</DropdownMenuItem>


        </DropdownMenuContent>
      </DropdownMenu>

      <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">

        <div className="mb-8 md:mb-6 lg:mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
            {slide?.name}
          </h1>
          <div className='flex w-full'>
            {/* <Button variant="outline" className='ml-auto' onClick={() => setAutoPlay(true)}>🎧 PLAY ALL AUDIO</Button> */}
            {/* <Select>
              <SelectTrigger className="absolute right-6 top-2 w-20">
                <SelectValue>Actions</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {
                  slideImages && slideImages.some(item => !item.generated_text) ? (
                    <SelectItem value="Generate All Slide Text" onClick={generateAllSlideText} disabled={generatedAllSlideText}>Generate All Slide Text</SelectItem>
                  ) : null}
                {
                  slideImages && slideImages.some(item => !item.audio_url) ? (
                    <SelectItem value="Generate All Audio" onClick={generateAllAudio} disabled={generatedAllSlideText}>Generate All Audio</SelectItem>
                  ) : null}
                {
                  quizQuestions && quizQuestions.length > 0 ? (
                    <SelectItem value="View Quiz" onClick={() => push(`/slides/${props.params.slide_id}/quiz`)}>View Quiz</SelectItem>
                  ) :
                    slideImages && slideImages.some(item => !item.generated_text) ?
                      null
                      : <SelectItem value="Generate Quiz" onClick={generateQuiz} disabled={QuizBtnDisabled}>Generate Quiz</SelectItem>
                }

                <SelectItem value="Auto Play All Audio" onClick={() => setAutoPlay(true)}>Auto Play All Audio</SelectItem>
              </SelectContent>
            </Select> */}
          </div>


          {/* {
          slideImages && slideImages.some(item => !item.generated_text) ? (
            <>
              <Button variant="outline" className="mt-2" onClick={generateAllSlideText} disabled={generatedAllSlideText}>🚀 GENERATE ALL SLIDE TEXT</Button>
            </>
          ) : null
        }
        {
          slideImages && slideImages.some(item => !item.audio_url) ? (
            <>
              <Button variant="outline" className="mt-2" onClick={generateAllAudio} disabled={generatedAllSlideText}>🎶 GENERATE ALL AUDIO TEXT</Button>
            </>
          ) : null
        }
        {
          quizQuestions && quizQuestions.length > 0 ? (
            <Button variant="outline" className="mt-2" onClick={() => push(`/slides/${props.params.slide_id}/quiz`)}>🧠 VIEW QUIZ</Button>
          ) :
            slideImages && slideImages.some(item => !item.generated_text) ?
              null
              : <>
                <Button variant="outline" className="mt-2" onClick={generateQuiz} disabled={QuizBtnDisabled}>🧠 GENERATE QUIZ</Button>
              </>
        } */}
          {/* <Button variant="outline" className="mt-2" onClick={() => setAutoPlay(true)}>🎧 AUTO PLAY ALL AUDIO</Button> */}
          {/* <h3 className='mt-2'>Generation might take up to a minute, please refresh if text/audio not showing</h3> */}
        </div>
        {
          slideImages?.map((item, index) => (
            <SlideImageSection
              key={index}
              index={index}
              item={item}
              audioPlayer={audioPlayer}
              setAudioPlaying={setAudioPlaying}
              isVapiStarted={isVapiStarted}
              sendMsg={sendMsg}
              setSlideImages={setSlideImages}
              audioPlaying={audioPlaying}
              length={slideImages.length}
              setAudioIndex={setAudioIndex}
              audioIndex={audioIndex}
              autoPlay={autoPlay}
              setAutoPlay={setAutoPlay}
              audioSpeed={audioSpeed}
            />
          ))
        }

        <div className="fixed bottom-4 right-4">
          {
            isVapiStarted ? (
              <>
                <Card className="fixed bottom-20 right-4 w-80">
                  <div className="flex flex-col h-96 overflow-y-auto">
                    <div className="flex flex-col h-full p-4 space-y-4">
                      <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-lg">Chat</h2>
                        {/* <button className="text-sm text-gray-500" onClick={sendMsg}>TEST</button> */}

                      </div>
                      <div className="flex flex-col space-y-4">
                        {
                          chatLog.map((message, index) => (
                            <div key={index} className="flex flex-row space-x-4">
                              <Avatar>
                                <AvatarFallback>{message.role === "assistant" ? "A" : "U"}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col space-y-1">
                                <p className="font-bold">{message.role === "assistant" ? "Assistant" : "You"}</p>
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </Card>
                <button className="bg-red-500 hover:bg-red-600 text-white text-xl rounded-full w-12 h-12 flex items-center justify-center" onClick={stopVapi}>
                  <Mic />
                </button>
              </>
            ) : (

              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-full w-12 h-12 flex items-center justify-center" onClick={startVapi}>
                <MicOffIcon />
              </button>
            )
          }
        </div>
      </main >
    </>
  )
}
