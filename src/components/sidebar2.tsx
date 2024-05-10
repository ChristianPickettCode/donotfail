"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { EyeIcon, HomeIcon, MenuSquareIcon, PencilLine, TextSearchIcon, WalletCardsIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Gallery } from "./gallery"
import { useEffect, useState } from "react"
import { GetSlides } from "@/app/action"

export function Sidebar2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [slides, setSlides] = useState([])

  useEffect(() => {
    console.log("Gallery")
    GetSlides()
      .then((res) => {
        console.log(res)
        setSlides(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div key="1" className="grid min-h-screen w-full">
      <div className="sidebar hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <span className="">donotfail.ai</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <div className="grid gap-2 px-4">
              <nav className="space-y-2">
                <Collapsible>
                  <Link href="/gallery">
                    <CollapsibleTrigger>
                      <span className="w-60 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                        <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                          <HomeIcon size={20} />
                        </span>
                        <span className="text-sm font-medium">Home</span>
                      </span>
                    </CollapsibleTrigger>
                  </Link>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger>
                    <span className="w-60 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                      <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                        <EyeIcon size={20} />
                      </span>
                      <span className="text-sm font-medium">Explore</span>
                    </span>
                  </CollapsibleTrigger>

                  {
                    slides?.map((item: any, index: number) => (
                      <Link key={index} href={`/slides/${item?._id}`}>
                        <CollapsibleContent>
                          <span className="ml-6 w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                            {/* <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                                <StarIcon size={20} />
                                            </span> */}
                            <span className="text-sm font-medium">{item?.name}</span>
                          </span>
                        </CollapsibleContent>

                      </Link>
                    ))
                  }


                </Collapsible>

                <Collapsible disabled>
                  <Link href="/">
                    <CollapsibleTrigger>
                      <span className="w-60 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                        <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                          <WalletCardsIcon size={20} />
                        </span>
                        <div className="w-full flex justify-between">
                          <span className="text-sm font-medium">Flashcards</span>
                          <Badge className="ml-auto">Coming soon</Badge>
                        </div>
                      </span>
                    </CollapsibleTrigger>
                  </Link>
                </Collapsible>

                <Collapsible disabled>
                  <Link href="/">
                    <CollapsibleTrigger>
                      <span className="w-60 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                        <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                          <TextSearchIcon size={20} />
                        </span>
                        <div className="w-full flex justify-between">
                          <span className="text-sm font-medium">Quizzes</span>
                          <Badge className="ml-auto">Coming soon</Badge>
                        </div>
                      </span>
                    </CollapsibleTrigger>
                  </Link>
                </Collapsible>

                <Collapsible disabled>
                  <Link href="/">
                    <CollapsibleTrigger>
                      <span className="w-60 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                        <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                          <PencilLine size={20} />
                        </span>
                        <div className="w-full flex justify-between">
                          <span className="text-sm font-medium">Notes</span>
                          <Badge className="ml-auto">Coming soon</Badge>
                        </div>

                      </span>
                    </CollapsibleTrigger>
                  </Link>
                </Collapsible>
              </nav>
            </div>
          </div>
          <div className="mt-auto p-4">
            <Link href="https://donotfail.canny.io/feature-requests">
              <Button className="w-full">
                <UploadIcon className="mr-2 h-4 w-4" />
                Request Feature
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="content flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          {/* <div className="brand-name hidden lg:block py-2">donotfail.ai</div> */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="menu-button my-2" size="icon" variant='ghost'>
                <MenuSquareIcon />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex h-full max-h-screen flex-col gap-4">
                <div className="flex h-[60px] items-center border-b px-6">
                  <Link className="flex items-center gap-2 font-semibold" href="#">
                    <ImageIcon className="h-6 w-6" />
                    <span className="brand-name sm:display-none">donotfail.ai</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <div className="grid gap-2 px-4">
                    {/* <div className="relative">
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                        placeholder="Search images..."
                        type="search"
                      />
                    </div> */}
                    <nav className="space-y-2">
                      <Collapsible>
                        <Link href="/gallery">
                          <CollapsibleTrigger>
                            <span className="w-80 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                              <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                <HomeIcon size={20} />
                              </span>
                              <span className="text-sm font-medium">Home</span>
                            </span>
                          </CollapsibleTrigger>
                        </Link>
                      </Collapsible>
                      <Collapsible>
                        <CollapsibleTrigger>
                          <span className="w-80 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                            <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                              <EyeIcon size={20} />
                            </span>
                            <span className="text-sm font-medium">Explore</span>
                          </span>
                        </CollapsibleTrigger>

                        {
                          slides?.map((item: any, index: number) => (
                            <Link key={index} href={`/slides/${item?._id}`}>
                              <CollapsibleContent>
                                <span className="ml-6 w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                                  {/* <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                                <StarIcon size={20} />
                                            </span> */}
                                  <span className="text-sm font-medium">{item?.name}</span>
                                </span>
                              </CollapsibleContent>

                            </Link>
                          ))
                        }


                      </Collapsible>

                      <Collapsible disabled>
                        <Link href="/">
                          <CollapsibleTrigger>
                            <span className="w-80 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                              <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                <WalletCardsIcon size={20} />
                              </span>
                              <div className="w-full flex justify-between">
                                <span className="text-sm font-medium">Flashcards</span>
                                <Badge className="ml-auto">Coming soon</Badge>
                              </div>
                            </span>
                          </CollapsibleTrigger>
                        </Link>
                      </Collapsible>

                      <Collapsible disabled>
                        <Link href="/">
                          <CollapsibleTrigger>
                            <span className="w-80 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                              <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                <TextSearchIcon size={20} />
                              </span>
                              <div className="w-full flex justify-between">
                                <span className="text-sm font-medium">Quizzes</span>
                                <Badge className="ml-auto">Coming soon</Badge>
                              </div>
                            </span>
                          </CollapsibleTrigger>
                        </Link>
                      </Collapsible>

                      <Collapsible disabled>
                        <Link href="/">
                          <CollapsibleTrigger>
                            <span className="w-80 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                              <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                <PencilLine size={20} />
                              </span>
                              <div className="w-full flex justify-between">
                                <span className="text-sm font-medium">Notes</span>
                                <Badge className="ml-auto">Coming soon</Badge>
                              </div>

                            </span>
                          </CollapsibleTrigger>
                        </Link>
                      </Collapsible>
                    </nav>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        <main className="">
          {children}
        </main>
      </div>
    </div>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}


function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}
