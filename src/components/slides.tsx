"use client"
import Vapi from "@vapi-ai/web";

import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { GenerateAudio, GenerateSlideImageText, GetSlide, GetSlideImages, Ping } from "@/app/action";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import Markdown from 'react-markdown'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY as string;

export function Slides({ params }: any) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isVapiStarted, setIsVapiStarted] = useState(false);
  const [slideImages, setSlideImages] = useState<any[]>([]);
  const [slide, setSlide] = useState<any>({});
  const [generationLoading, setGenerationLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);


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
    GetSlideImages(params.slide_id)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setSlideImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GetSlide(params.slide_id)
      .then((res) => {
        console.log(res);
        setSlide(res.data);
      })
  }, [params.slide_id]);

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
        console.log(`Assistant volume level: ${volume}`);
      });

      vapi.on("message", (message) => {
        console.log(message);
      });

      vapi.on("error", (e) => {
        console.error(e);
      });

      vapi.on("call-start", () => {
        console.log("Call has started.");
      });

      vapi.on("call-end", () => {
        console.log("Call has ended.");
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




  return (
    <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
      <div className="mb-8 md:mb-6 lg:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {slide?.name}
        </h1>
      </div>
      {
        slideImages?.map((item, index) => (
          <div key={index} id={`s${index + 1}`}>
            <section key={index} className="flex w-full mb-8 mt-10 pl-4 pr-8">
              {/* <img
                alt="Placeholder Image"
                className="h-[60vh] w-auto bg-gray-300"
                src={item.image_url}
              /> */}
              {/* <Image src={item.image_url} height={500} width={500} alt="Slide Image" /> */}
              <PhotoProvider>
                <PhotoView src={item.image_url}>
                  <img src={item.image_url} className="w-[40vw] h-auto object-contain" alt="" />
                </PhotoView>
              </PhotoProvider>

              <div className="flex flex-col ml-6 w-1/2 md:w-full">
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

                </div>
                <Markdown className='text-sm' >{item.generated_text}</Markdown>
              </div>

            </section >
            <p className='text-right pr-2'>{index + 1}</p>
            <Separator />
          </div >
        ))
      }

      {/* <div className="fixed bottom-4 right-4">
        {
          isVapiStarted ? (
            <button className="bg-red-500 hover:bg-red-600 text-white text-xl rounded-full w-12 h-12 flex items-center justify-center" onClick={stopVapi}>
              -
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-full w-12 h-12 flex items-center justify-center" onClick={startVapi}>
              +
            </button>
          )
        }
      </div> */}

    </main >
  )
}
