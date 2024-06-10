"use client"
import React, { use, useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import MarkdownWithLatex from '@/app/MarkdownWithLatex'
import { Button } from './ui/button'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { AudioLinesIcon, PauseIcon, PlayIcon, RefreshCwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GenerateAudio, GenerateSlideImageText, Ping } from '@/app/action'
import Loader from './ui/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  index: number;
  item: any;
  setSlideImages: any;
  audioPlayer: any;
  setAudioPlaying: any;
  audioPlaying: any;
  isVapiStarted: any;
  sendMsg: any;
  length: number;
  audioIndex: number;
  setAudioIndex: any;
  autoPlay: boolean
  setAutoPlay: any
  audioSpeed: number
}

export const maxDuration = 300; // 5 minutes

const SlideImageSection = (props: Props) => {

  const [generationLoading, setGenerationLoading] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [thisAudioPlaying, setThisAudioPlaying] = useState(false);
  const { push, refresh } = useRouter()
  const [slideImage, setSlideImage] = useState<any>(props.item);
  const [streaming, setStreaming] = useState(false);

  const handleGenerateText = (slideImageId: string, index: number) => {
    setGenerationLoading(true);
    console.log("handleGenerateText")
    GenerateSlideImageText(slideImageId)
      .then((response) => {
        // console.log(response);
        if (response.status == "success") {
          console.log("Text generated successfully");
          // console.log(response.data);
          // props.setSlideImages((prev: any) => {
          //   return prev.map((item: any) => {
          //     if (item.id === slideImageId) {
          //       return {
          //         ...item,
          //         generated_text: response.data,
          //       }
          //     }
          //     return item;
          //   })
          // })

          setSlideImage((prev: any) => {
            return {
              ...prev,
              generated_text: response.data,
            }
          })

          setGenerationLoading(false);
          // push(`#s${index + 1}`)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Function to handle audio generation with SSE support
  const handleGenerateAudio = (slideImageId: string) => {
    setIsGeneratingAudio(true);
    console.log("handleGenerateAudio, slideImageId:", slideImageId);

    try {
      // SSE for audio generation
      const eventSource = new EventSource(`${process.env.SERVER_URL!}/generate-audio/${slideImageId}`);

      eventSource.onmessage = function (event) {
        console.log("Event received:", event.data);

        // Attempt to parse the data as JSON, if it fails, it's a plain text progress update
        try {
          const parsedData = JSON.parse(event.data);

          if (parsedData.status === "success" && parsedData.data) {
            const finalAudioURL = parsedData.data;
            setSlideImage((prev: any) => ({
              ...prev,
              audio_url: finalAudioURL,
            }));

            props.setSlideImages((prev: any) => prev.map((item: any) => {
              if (item.id === slideImageId) {
                return {
                  ...item,
                  audio_url: finalAudioURL,
                };
              }
              return item;
            }));

            setIsGeneratingAudio(false);
            eventSource.close();
          }
        } catch (e) {
          console.log("Progress update:", event.data);
          // Optionally, you can display these progress updates to the user
        }
      };

      eventSource.onerror = function (err) {
        console.error("EventSource failed:", err);
        setIsGeneratingAudio(false);
        eventSource.close();
      };
    } catch (err) {
      console.error(err);
      setIsGeneratingAudio(false);
    }
  };

  const ping = (slideImageId: string) => {
    Ping()
      .then((res) => {
        console.log(res.data);
        props.setSlideImages((prev: any) => {
          return prev.map((item: any) => {
            if (item.id === slideImageId) {
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
    if (props.audioPlayer != null) {
      props.audioPlayer.pause();
      props.setAudioPlaying(false);
      setThisAudioPlaying(false);
    }
  }

  const handlePlayAudio = () => {
    if (props.audioPlayer != null) {
      props.audioPlayer.src = slideImage.audio_url
      props.audioPlayer.playbackRate = props.audioSpeed;
      props.audioPlayer.play();
      props.setAudioPlaying(true);
      setThisAudioPlaying(true);
      props.audioPlayer.onended = () => {
        const nextIndex = props.index + 1;
        props.setAutoPlay(true);
        if (nextIndex < props.length) {
          document.getElementById(`s${nextIndex + 1}`)?.scrollIntoView({ behavior: "smooth" });
          props.setAudioIndex(nextIndex);
        } else {
          props.setAudioPlaying(false);
        }
      }
    }
  }

  // Function to handle the refresh action
  const handleRefresh = async (slideImageId: string) => {
    console.log("handleRefresh");
    setGenerationLoading(true);

    try {
      const eventSourceText = new EventSource(`${process.env.SERVER_URL!}/generate-image-text/${slideImageId}`);
      eventSourceText.onmessage = function (event) {
        console.log("Text Event received:", event.data);

        try {
          const parsedData = JSON.parse(event.data);

          if (parsedData.status === "success" && parsedData.data) {
            console.log("Text generated successfully");
            const generatedText = parsedData.data;

            const eventSourceAudio = new EventSource(`${process.env.SERVER_URL!}/generate-audio/${slideImageId}?update=true`);
            eventSourceAudio.onmessage = function (event) {
              console.log("Audio Event received:", event.data);

              try {
                const audioParsedData = JSON.parse(event.data);

                if (audioParsedData.status === "success" && audioParsedData.data) {
                  const finalAudioURL = audioParsedData.data;
                  setSlideImage((prev: any) => ({
                    ...prev,
                    generated_text: generatedText,
                    audio_url: finalAudioURL,
                  }));

                  props.setSlideImages((prev: any) => prev.map((item: any) => {
                    if (item.id === slideImageId) {
                      return {
                        ...item,
                        generated_text: generatedText,
                        audio_url: finalAudioURL,
                      };
                    }
                    return item;
                  }));

                  setGenerationLoading(false);
                  eventSourceAudio.close();
                }
              } catch (e) {
                console.log("Audio Progress update:", event.data);
              }
            };

            eventSourceAudio.onerror = function (err) {
              console.error("Audio EventSource failed:", err);
              setGenerationLoading(false);
              eventSourceAudio.close();
            };

            eventSourceText.close();
          }
        } catch (e) {
          console.log("Text Progress update:", event.data);
        }
      };

      eventSourceText.onerror = function (err) {
        console.error("Text EventSource failed:", err);
        setGenerationLoading(false);
        eventSourceText.close();
      };
    } catch (err) {
      console.error(err);
      setGenerationLoading(false);
    }
  };

  useEffect(() => {
    if (props.audioIndex == props.index && props.autoPlay) {
      handlePlayAudio();
    }
  }, [props.audioIndex, props.autoPlay])

  return (
    <div key={props.index} id={`s${props.index + 1}`}>
      <section key={props.index} className="flex flex-col md:flex-row w-full mb-8 mt-10 pl-4 pr-8">
        <div className="md:w-1/2">
          <PhotoProvider>
            <PhotoView src={slideImage.image_url}>
              <img src={slideImage.image_url} className="w-full h-auto object-contain mb-4" alt="Slide Image" />
            </PhotoView>
          </PhotoProvider>
          <div className="flex flex-row items-center space-x-2">
            {!slideImage.generated_text ? (
              ""
            ) : !slideImage.audio_url ? (
              <Button variant="outline" className="h-10" onClick={() => handleGenerateAudio(slideImage.id)} disabled={isGeneratingAudio}>
                {isGeneratingAudio ? <Loader className='w-4 h-4 m-0' /> : <PlayIcon size={"1em"} />}
              </Button>
            ) : (
              <>
                {props.audioPlaying && thisAudioPlaying ? (
                  <Button variant="outline" className="h-10" onClick={handlePauseAudio}>
                    <PauseIcon size={"1em"} />
                  </Button>
                ) : (
                  <Button variant="outline" className="h-10" onClick={() => handlePlayAudio()}>
                    <PlayIcon size={"1em"} />
                  </Button>
                )}
              </>
            )}
            {slideImage.generated_text && (
              <Button variant="outline" className="ml-2 h-10" onClick={() => handleRefresh(slideImage.id)} disabled={generationLoading}>
                {generationLoading ? <Loader className='w-4 h-4 m-0' /> : <RefreshCwIcon size={"1em"} />}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:ml-6 w-full md:w-1/2">
          {
            generationLoading ? <Loader className='w-6 m-0' /> : <MarkdownWithLatex markdownText={slideImage.generated_text ? slideImage.generated_text : ""} streaming={streaming} />
          }

        </div>

      </section >
      <p className='text-right pr-2'>{props.index + 1}</p>
      <Separator />
    </div >
  )
}


export default SlideImageSection