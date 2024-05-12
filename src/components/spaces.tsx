"use client"
import { GetSpaces } from '@/app/action'
import React, { useEffect, useState } from 'react'
import { CreateSpaceModal } from './create-space-modal'
import Link from 'next/link'

type Props = {}

const emojiList = ["😇", "🤩", "🥳", "🎉", "🎊", "🎈", "🎁", "🎀", "🌟", "💫", "✨", "🪐", "🌠", "🔥", "🎇", "🎆", "🌌", "🌈", "☄️",
    "💥", "💢", "💫", "💦", "🌊", "💧", "💤", "🌪️", "🌫️", "🌬️", "🌀"]

const bgColorList = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500",
    "bg-red-300", "bg-yellow-300", "bg-green-300", "bg-blue-300", "bg-indigo-300", "bg-purple-300", "bg-pink-300"]

function Spaces({ }: Props) {
    const [spaces, setSpaces] = useState([])

    useEffect(() => {
        console.log("Spaces")
        GetSpaces()
            .then((res) => {
                console.log(res)
                setSpaces(res.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
            <div className="flex justify-end mb-4">
                <CreateSpaceModal />
            </div>
            {/* <Button onClick={testSomething}>TEST</Button> */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    spaces?.map((item: any, index) => (
                        <Link key={index} href={`/spaces/${item?._id}`}>
                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className={`h-48 w-full flex items-center justify-center object-cover transition-all duration-300 group-hover:scale-105 ${bgColorList[index % bgColorList.length]}`}>
                                    <span className="text-xl">{emojiList[index % emojiList.length]}</span>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 group-hover:text-primary">
                                        {item?.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </div>
        </main>
    )
}

export default Spaces