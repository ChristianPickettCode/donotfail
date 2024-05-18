import React, { useState } from 'react'
import { Separator } from './ui/separator'
import MarkdownWithLatex from '@/app/MarkdownWithLatex'
import { Button } from './ui/button'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { PauseIcon, PlayIcon, RefreshCwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { GenerateAudio, GenerateSlideImageText, Ping } from '@/app/action'
import Loader from './ui/loader'

type Props = {
  index: number;
  item: any;
  setSlideImages: any;
  audioPlayer: any;
  setAudioPlaying: any;
  audioPlaying: any;
  isVapiStarted: any;
  sendMsg: any;
}

const SlideImageSection = (props: Props) => {

  const [generationLoading, setGenerationLoading] = useState(false);
  const [thisAudioPlaying, setThisAudioPlaying] = useState(false);
  const { push } = useRouter()

  const generateSlideImageText = (slideImageId: string, index: number) => {
    setGenerationLoading(true);
    console.log("generateSlideImageText")
    GenerateSlideImageText(slideImageId)
      .then((response) => {
        // console.log(response);
        if (response.status == "success") {
          console.log("Text generated successfully");
          // console.log(response.data);
          props.setSlideImages((prev: any) => {
            return prev.map((item: any) => {
              if (item.id === slideImageId) {
                return {
                  ...item,
                  generated_text: response.data,
                }
              }
              return item;
            })
          })
          setGenerationLoading(false);
          push(`#s${index + 1}`)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const generateAudio = (slideImageId: string, index: number) => {
    console.log("generateAudio, slideImageId: ", slideImageId, "index: ", index)
    setGenerationLoading(true);
    GenerateAudio({ slide_image_id: slideImageId })
      .then((res) => {
        console.log(res);
        if (res.status_code == 200) {
          console.log("Audio generated successfully");
          props.setSlideImages((prev: any) => {
            return prev.map((item: any) => {
              if (item.id === slideImageId) {
                return {
                  ...item,
                  audio_url: res.data,
                }
              }
              return item;
            })
          })
          setGenerationLoading(false);
          // push(`#s${index + 1}`)
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

  const handlePlayAudio = (audio_url: string) => {
    if (props.audioPlayer != null) {
      props.audioPlayer.src = audio_url
      props.audioPlayer.playbackRate = 1.2;
      props.audioPlayer.play();
      props.setAudioPlaying(true);
      setThisAudioPlaying(true);
    }
  }

  return (
    <div key={props.index} id={`s${props.index + 1}`}>
      <section key={props.index} className="flex flex-col md:flex-row w-full mb-8 mt-10 pl-4 pr-8">
        <div className="md:w-1/2">
          {/* <img
                  alt="Placeholder Image"
                  className="h-[60vh] w-auto bg-gray-300"
                  src={item.image_url}
                /> */}
          {/* <Image src={item.image_url} height={500} width={500} alt="Slide Image" /> */}
          <PhotoProvider>
            <PhotoView src={props.item.image_url}>
              <img src={props.item.image_url} className="w-full h-auto object-contain mb-4" alt="" />
            </PhotoView>
          </PhotoProvider>
        </div>

        <div className="flex flex-col md:ml-6 w-full md:w-1/2">
          <div className="flex flex-row mb-2">
            {!props.item.generated_text ? <Button variant="outline" className="mr-2" onClick={() => generateSlideImageText(props.item.id, props.index)}>✨ Generate Notes</Button> :

              !props.item.audio_url ? <Button variant="outline" onClick={() => generateAudio(props.item.id, props.index)}>✨ Generate Audio</Button>
                : <>
                  {props.audioPlaying && thisAudioPlaying ? (
                    <Button variant="outline" onClick={handlePauseAudio}><PauseIcon size={"1em"} /></Button>
                  ) : (
                    <Button variant="outline" onClick={() => handlePlayAudio(props.item.audio_url)}><PlayIcon size={"1em"} /></Button>
                  )}
                </>
            }
            {/* <Button variant="outline" className="ml-2" onClick={() => generateAudio(props.item.id, props.index)}>✨ Audio<RefreshCwIcon /></Button> */}

            {props.item.generated_text && props.isVapiStarted ? <Button variant="outline" className="ml-2" onClick={() => props.sendMsg(props.item.generated_text)}>🤖 Ask Marcus</Button> : ""}

            {/* loading */}
            {generationLoading ? <Loader /> : ""}
          </div>
          <MarkdownWithLatex markdownText={props.item.generated_text ? props.item.generated_text : ""} />
        </div>

      </section >
      <p className='text-right pr-2'>{props.index + 1}</p>
      <Separator />
    </div >
  )
}

export default SlideImageSection