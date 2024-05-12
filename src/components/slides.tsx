"use client"
import Vapi from "@vapi-ai/web";

import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { GenerateAudio, GenerateSlideImageText, GetSlide, GetSlideImages, Ping } from "@/app/action";
import { Button } from "./ui/button";
import { CommandIcon, PauseIcon, PlayIcon } from "lucide-react";
import Markdown from 'react-markdown'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import CommandBar from "./commandbar";

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY as string;

type Props = {
  params: any
}

export function Slides(props: Props) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isVapiStarted, setIsVapiStarted] = useState(false);
  const [slideImages, setSlideImages] = useState<any[]>([]);
  const [slide, setSlide] = useState<any>({});
  const [generationLoading, setGenerationLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const [chatLog, setChatLog] = useState<any[]>([]);




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
        console.log(res);
        console.log(res.data);
        setSlideImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GetSlide(props.params.slide_id)
      .then((res) => {
        console.log(res);
        setSlide(res.data);
      })
  }, [props.params.slide_id]);

  const startVapi = () => {
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

      vapi.start("ed4c5eb8-d772-4f0f-be11-40502187e74d");

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

  const generateSlideImageText = (slideImageId: string) => {
    setGenerationLoading(true);
    console.log("generateSlideImageText")
    GenerateSlideImageText(slideImageId)
      .then((response) => {
        console.log(response);
        if (response.status_code === 200) {
          console.log("Text generated successfully");
          console.log(response.data);
          setSlideImages((prev) => {
            return prev.map((item) => {
              if (item._id === slideImageId) {
                return {
                  ...item,
                  generated_text: response.data,
                }
              }
              return item;
            })
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const generateAudio = (slideImageId: string) => {
    console.log("generateAudio")
    GenerateAudio({ slide_image_id: slideImageId })
      .then((res) => {
        console.log(res);
        setSlideImages((prev) => {
          return prev.map((item) => {
            if (item._id === slideImageId) {
              return {
                ...item,
                audio_url: res.data,
              }
            }
            return item;
          })
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const ping = (slideImageId: string) => {
    Ping()
      .then((res) => {
        console.log(res.data);
        setSlideImages((prev) => {
          return prev.map((item) => {
            if (item._id === slideImageId) {
              return {
                ...item,
                generated_text: res.data,
              }
            }
            return item;
          })
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlePauseAudio = () => {
    if (audioPlayer != null) {
      audioPlayer.pause();
      setAudioPlaying(false);
    }
  }

  const handlePlayAudio = (audio_url: string) => {
    if (audioPlayer != null) {
      audioPlayer.src = audio_url
      audioPlayer.play();
      setAudioPlaying(true);
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
  }, [slideImages]);



  return (
    <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
      <div className="mb-8 md:mb-6 lg:mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {slide?.name}
        </h1>
      </div>
      {
        slideImages?.map((item, index) => (
          <div key={index} id={`s${index + 1}`}>
            <section key={index} className="flex flex-col md:flex-row w-full mb-8 mt-10 pl-4 pr-8">
              <div className="md:w-1/2">
                {/* <img
                  alt="Placeholder Image"
                  className="h-[60vh] w-auto bg-gray-300"
                  src={item.image_url}
                /> */}
                {/* <Image src={item.image_url} height={500} width={500} alt="Slide Image" /> */}
                <PhotoProvider>
                  <PhotoView src={item.image_url}>
                    <img src={item.image_url} className="w-full h-auto object-contain mb-4" alt="" />
                  </PhotoView>
                </PhotoProvider>
              </div>

              <div className="flex flex-col md:ml-6 w-full md:w-1/2">
                <div className="flex flex-row mb-2">
                  {!item.generated_text ? <Button variant="outline" className="mr-2" onClick={() => generateSlideImageText(item._id)}>✨ Generate Notes</Button> :

                    !item.audio_url ? <Button variant="outline" onClick={() => generateAudio(item._id)}>✨ Generate Audio</Button>
                      : <>
                        {audioPlaying ? (
                          <Button variant="outline" onClick={handlePauseAudio}><PauseIcon size={"1em"} /></Button>
                        ) : (
                          <Button variant="outline" onClick={() => handlePlayAudio(item.audio_url)}><PlayIcon size={"1em"} /></Button>
                        )}
                      </>
                  }

                  {item.generated_text && isVapiStarted ? <Button variant="outline" className="ml-2" onClick={() => sendMsg(item.generated_text)}>🤖 Ask Marcus</Button> : ""}

                </div>
                <Markdown className='text-sm' >{item.generated_text}</Markdown>
              </div>

            </section >
            <p className='text-right pr-2'>{index + 1}</p>
            <Separator />
          </div >
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
                -
              </button>
            </>
          ) : (

            <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-full w-12 h-12 flex items-center justify-center" onClick={startVapi}>
              +
            </button>
          )
        }
      </div>
      {/* <CommandBar /> */}
    </main >
  )
}
