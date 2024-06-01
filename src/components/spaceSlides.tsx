"use client"
import Link from "next/link"
import { UploadModal } from "./upload-modal"
import { useEffect, useState } from "react"
import { AddSlideToSpace, GetSlides, GetSpace, GetSpaceSlides } from "@/app/action"
import { Button } from "./ui/button"
import posthog from "posthog-js"

const emojiList = ["😇", "🤩", "🥳", "🎉", "🎊", "🎈", "🎁", "🎀", "🌟", "💫", "✨", "🪐", "🌠", "🔥", "🎇", "🎆", "🌌", "🌈", "☄️",
    "💥", "💢", "💫", "💦", "🌊", "💧", "💤", "🌪️", "🌫️", "🌬️", "🌀"]

const bgColorList = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500",
    "bg-red-300", "bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-indigo-300", "bg-purple-300", "bg-pink-300"]

type Props = {
    spaceId: string
}

export function SpaceSlides(props: Props) {
    const [slides, setSlides] = useState([])
    const [selectedSpace, setSelectedSpace] = useState<any>(null)
    console.log(props)

    useEffect(() => {

        GetSpace(props.spaceId)
            .then((res) => {
                console.log(res)
                setSelectedSpace(res)
            })
            .catch((err) => {
                console.log(err)
            })

        GetSpaceSlides(props.spaceId)
            .then((res) => {
                // console.log(res)
                // sort by name
                // let sorted = res.data.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)
                setSlides(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [props.spaceId])

    const deleteSlide = (id: string) => {
        console.log("delete slide", id)
    }

    const testSomething = () => {
        console.log("test")
        posthog.capture('my event', { property: 'value' })
    }



    return (
        <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-primary">{selectedSpace?.name}</h2>
                <UploadModal spaceId={props.spaceId} />
            </div>

            {/* <Button onClick={testSomething}>TEST</Button> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    slides?.map((item: any, index) => (
                        <Link key={index} href={`/slides/${item?.id}`}>
                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                {/* <img
                  alt="Course Thumbnail"
                  className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width="300"
                /> */}
                                <div className={`h-48 w-full flex items-center justify-center object-cover transition-all duration-300 group-hover:scale-105 ${bgColorList[index % bgColorList.length]}`}>
                                    <span className="text-xl">{emojiList[index % emojiList.length]}</span>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-primary">
                                        {item?.name}
                                    </h3>
                                    {/* <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                    ....
                  </p> */}
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </div>
        </main>
    )
}
