"use client"
import Link from "next/link"
import { UploadModal } from "./upload-modal"
import { useEffect, useState } from "react"
import { GetSlides } from "@/app/action"

export function Gallery() {
  const [slides, setSlides] = useState([])

  useEffect(() => {
    GetSlides()
      .then((res) => {
        console.log(res)
        setSlides(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const deleteSlide = (id: string) => {
    console.log("delete slide", id)
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
      <div className="flex justify-end mb-4">
        <UploadModal />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          slides?.map((item: any, index) => (
            <Link key={index} href={`/gallery/${item?._id}`}>
              <div key={index} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <img
                  alt="Course Thumbnail"
                  className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width="300"
                />
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
