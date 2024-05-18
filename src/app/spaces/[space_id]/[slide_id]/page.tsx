"use client"
import { AddSlideToSpace, GetSlide, GetSlideImages, GetSpaces } from '@/app/action'
import DeleteModal from '@/components/delete-modal'
import { Sidebar } from '@/components/sidebar'
import { Sidebar2 } from '@/components/sidebar2'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'

type Props = {}

// Use server side rendering ** 
const Page = ({ params }: any) => {

    const { slide_id } = params
    const [slide, setSlide] = useState<any>(null)
    const [slideImages, setSlideImages] = useState<any[]>([])
    const [selectedSpace, setSelectedSpace] = useState<any>(null)
    const [spaces, setSpaces] = useState<any[]>([])
    const { push } = useRouter()

    useEffect(() => {
        GetSlide(slide_id)
            .then((res) => {
                // console.log(res)
                setSlide(res)
            })
            .catch((err) => {
                console.log(err)
            })

        GetSlideImages(slide_id)
            .then((res) => {
                // console.log(res)
                setSlideImages(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [slide_id])

    useEffect(() => {
        GetSpaces()
            .then((res) => {
                // console.log(res)
                setSpaces(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const addToSpace = () => {
        console.log("add to space")
        console.log(selectedSpace)
        console.log(slide_id)
        AddSlideToSpace({ space_id: selectedSpace, slide_id })
            .then((res) => {
                // console.log(res)
                push("/spaces")
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <Sidebar2>
            <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-semibold">{slide?.name}</h1>
                    <div className="flex justify-end mb-4">
                        {/* <Select onValueChange={setSelectedSpace} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Add to space" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    spaces?.map((item: any, index) => (
                                        <SelectItem key={index} value={item._id} >
                                            {item.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button onClick={addToSpace}>Add to Space</Button> */}
                        <Link href={`/slides/${slide_id}`}>
                            <Button variant="outline" className='mr-2'>View</Button>
                        </Link>
                        <DeleteModal params={params} />
                    </div>

                </div>


                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        slideImages?.map((item: any, index: number) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <Link href={`/slides/${slide_id}/#s${index + 1}`} scroll={false}>
                                    <img
                                        alt="Course Thumbnail"
                                        className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
                                        height="200"
                                        src={item.image_url}
                                        style={{
                                            aspectRatio: "300/200",
                                            objectFit: "cover",
                                        }}
                                        width="300"
                                    />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </main>
        </Sidebar2>

    )
}

export default Page