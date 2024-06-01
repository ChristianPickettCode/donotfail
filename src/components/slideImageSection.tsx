"use client"
import React, { useEffect, useState } from 'react'
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
}

export const maxDuration = 300; // 5 minutes

const SlideImageSection = (props: Props) => {

  const [generationLoading, setGenerationLoading] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [thisAudioPlaying, setThisAudioPlaying] = useState(false);
  const { push, refresh } = useRouter()
  const [slideImage, setSlideImage] = useState<any>(props.item);



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

  const handleGenerateAudio = (slideImageId: string, index: number) => {
    setIsGeneratingAudio(true);
    console.log("handleGenerateAudio, slideImageId: ", slideImageId, "index: ", index)
    // setGenerationLoading(true);
    GenerateAudio({ slide_image_id: slideImageId, update: false })
      .then((res) => {
        console.log("Audio RESPONSE:", res);
        if (res?.status_code == 200 && res.data) {
          console.log("Audio generated successfully");
          // props.setSlideImages((prev: any) => {
          //   return prev.map((item: any) => {
          //     if (item.id === slideImageId) {
          //       return {
          //         ...item,
          //         audio_url: res.data,
          //       }
          //     }
          //     return item;
          //   })
          // })

          setSlideImage((prev: any) => {
            return {
              ...prev,
              audio_url: res.data,
            }
          })

          // setGenerationLoading(false);
          setIsGeneratingAudio(false);
          // push(`#s${index + 1}`)
        } else {
          console.log("Audio generation failed");
          // push(`#s${index + 1}`)
          setGenerationLoading(false);
          refresh()

        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      props.audioPlayer.playbackRate = 1.75;
      props.audioPlayer.play();
      props.setAudioPlaying(true);
      setThisAudioPlaying(true);
      props.audioPlayer.onended = () => {
        const nextIndex = props.index + 1;
        if (nextIndex < props.length) {
          document.getElementById(`s${nextIndex + 1}`)?.scrollIntoView({ behavior: "smooth" });
          props.setAudioIndex(nextIndex);
        } else {
          props.setAudioPlaying(false);
        }
      }
    }
  }

  // refresh generated text and audio
  const handleRefresh = async (slideImageId: string, index: number) => {
    console.log("handleRefresh");
    setGenerationLoading(true);

    try {
      // Generate text
      const response = await GenerateSlideImageText(slideImageId);
      console.log(response);

      if (response.status !== "success") {
        throw new Error("Text generation failed");
      }

      console.log("Text generated successfully");

      // Generate audio using generated text
      const res = await GenerateAudio({ slide_image_id: slideImageId, update: true });
      console.log("Audio RESPONSE:", res);

      if (res?.status_code === 200 && res.data) {
        console.log("Audio generated successfully");

        const updateState = (prev: any) => prev.map((item: any) => {
          if (item.id === slideImageId) {
            return {
              ...item,
              generated_text: response.data,
              audio_url: res.data,
            };
          }
          return item;
        });

        setSlideImage((prev: any) => ({
          ...prev,
          generated_text: response.data,
          audio_url: res.data,
        }));

        props.setSlideImages(updateState);
      } else {
        throw new Error("Audio generation failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
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
              <Button variant="outline" className="h-10" onClick={() => handleGenerateText(slideImage.id, props.index)}>
                {generationLoading ? <Loader className='w-4 h-4 m-0' /> : "✨ Get Notes"}
              </Button>
            ) : !slideImage.audio_url ? (
              <Button variant="outline" className="h-10" onClick={() => handleGenerateAudio(slideImage.id, props.index)} disabled={isGeneratingAudio}>
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
            {/* <Select>
              <SelectTrigger className="ml-2 h-10 w-24">
                <SelectValue>1.75x</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="1.75">1.75x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select> */}
            {slideImage.generated_text && (
              <Button variant="outline" className="ml-2 h-10" onClick={() => handleRefresh(slideImage.id, props.index)} disabled={generationLoading}>
                {generationLoading ? <Loader className='w-4 h-4 m-0' /> : <RefreshCwIcon size={"1em"} />}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:ml-6 w-full md:w-1/2">
          {/* <div className="flex flex-row mb-2"> */}
          {/* {!slideImage.generated_text ? <Button variant="outline" className="mr-2" onClick={() => generateSlideImageText(slideImage.id, props.index)}>✨ Generate Notes</Button> :

              !slideImage.audio_url ? <Button variant="outline" onClick={() => generateAudio(slideImage.id, props.index)}>✨ Generate Audio</Button>
                : <>
                  {props.audioPlaying && thisAudioPlaying ? (
                    <Button variant="outline" onClick={handlePauseAudio}><PauseIcon size={"1em"} /></Button>
                  ) : (
                    <Button variant="outline" onClick={() => handlePlayAudio(slideImage.audio_url)}><PlayIcon size={"1em"} /></Button>
                  )}
                </>
            } */}
          {/* <Button variant="outline" className="ml-2" onClick={() => generateAudio(slideImage.id, props.index)}>✨ Audio<RefreshCwIcon /></Button> */}
          {/* <Button variant="outline" className="mr-2" onClick={() => generateSlideImageText(slideImage.id, props.index)}>✨ Generate Notes</Button> */}

          {/* {slideImage.generated_text && props.isVapiStarted ? <Button variant="outline" className="ml-2" onClick={() => props.sendMsg(slideImage.generated_text)}>🤖 Ask Marcus</Button> : ""} */}

          {/* loading */}
          {/* {generationLoading ? <Loader className='w-8 m-0' /> : ""} */}
          {/* </div> */}
          {
            generationLoading ? <Loader className='w-6 m-0' /> : <MarkdownWithLatex markdownText={slideImage.generated_text ? slideImage.generated_text : ""} streaming={true} />
          }

        </div>

      </section >
      <p className='text-right pr-2'>{props.index + 1}</p>
      <Separator />
    </div >
  )
}


export default SlideImageSection