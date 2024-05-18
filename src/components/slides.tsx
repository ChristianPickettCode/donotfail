"use client"
import Vapi from "@vapi-ai/web";

import { useEffect, useState } from "react";
import { GenerateAllAudioForSlide, GenerateAllImageText, GetSlide, GetSlideImages } from "@/app/action";
import { Button } from "./ui/button";
import { Mic, MicOffIcon } from "lucide-react";
import 'react-photo-view/dist/react-photo-view.css';
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SlideImageSection from "./slideImageSection";
import { useRouter } from "next/navigation";

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY as string;
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID as string;

type Props = {
  params: any
}

export function Slides(props: Props) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isVapiStarted, setIsVapiStarted] = useState(false);
  const [slideImages, setSlideImages] = useState<any[]>([]);
  const [slide, setSlide] = useState<any>({});

  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  const [chatLog, setChatLog] = useState<any[]>([]);

  const [generatedAllSlideText, setGeneratedAllSlideText] = useState(false);

  const { push, refresh } = useRouter()


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
  }, [slideImages]);

  const generateAllSlideText = () => {
    setGeneratedAllSlideText(true);
    console.log("Generating all slide text", props.params.slide_id);
    GenerateAllImageText(props.params.slide_id)
      .then((res) => {
        console.log(res);
        setSlideImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const generateAllAudio = () => {
    setGeneratedAllSlideText(true);
    console.log("Generating all audio", props.params.slide_id);
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



  return (
    <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
      <div className="mb-8 md:mb-6 lg:mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {slide?.name}
        </h1>
        {/* <Button variant="outline" className="mt-2" onClick={generateAllSlideText} disabled={generatedAllSlideText}>🚀 GENERATE ALL SLIDE TEXT</Button> */}
        <Button variant="outline" className="mt-2" onClick={generateAllAudio} disabled={generatedAllSlideText}>🎶 GENERATE ALL AUDIO TEXT</Button>
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
      {/* <CommandBar /> */}
    </main >
  )
}
