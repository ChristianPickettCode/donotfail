"use client"
import { GetSlide, GetSlideImages } from '@/app/action'
import DeleteModal from '@/components/delete-modal'
import { Sidebar } from '@/components/sidebar'
import { Sidebar2 } from '@/components/sidebar2'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = ({ params }: any) => {

    const { slide_id } = params
    // const [slide, setSlide] = useState<any>(null)
    const [slideImages, setSlideImages] = useState<any[]>([])

    useEffect(() => {
        // GetSlide(slide_id)
        //     .then((res) => {
        //         console.log(res)
        //         console.log(res.data)
        //         setSlide(res.data)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        GetSlideImages(slide_id)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                setSlideImages(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [slide_id])

    return (
        <Sidebar2>
            <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
                <div className="flex justify-end mb-4">
                    <Link href={`/slides/${slide_id}`}>
                        <Button variant="outline" className='mr-2'>View</Button>
                    </Link>
                    <DeleteModal slideId={slide_id} />
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