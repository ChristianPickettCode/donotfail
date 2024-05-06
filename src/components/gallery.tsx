import Link from "next/link"
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination"
import { Button } from "./ui/button"
import Upload from "./upload"

export function Gallery() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
      {/* <div className="mb-8 md:mb-12 lg:mb-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          Explore
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Find... something.
        </p>
      </div> */}
      <div className="flex justify-end mb-4">
        <Upload />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          Array.from({ length: 10 }).map((_, index) => (
            <Link key={index} href="/gallery/[id]" as={`/slides`}>
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
                    ...
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                    ....
                  </p>
                </div>
              </div>
            </Link>
          ))
        }

      </div>
      {/* <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </main>
  )
}
