"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { EyeIcon, HomeIcon, MenuSquareIcon, PencilLine, SunIcon, TextSearchIcon, UploadIcon, WalletCardsIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import { Gallery } from "./gallery"
import { useEffect, useState } from "react"
import { GetSlides, GetSpaces } from "@/app/action"

export function Sidebar2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [spaces, setSpaces] = useState([])

  useEffect(() => {
    console.log("Gallery")
    // GetSlides()
    //   .then((res) => {
    //     console.log(res)
    //     setSlides(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    GetSpaces()
      .then((res) => {
        console.log(res)
        setSpaces(res)
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
                  <Link href="/spaces">
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
                    spaces?.map((item: any, index: number) => (
                      <Link key={index} href={`/spaces/${item?.id}`}>
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

                <Link href="/quiz">
                  <Collapsible>

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

                  </Collapsible>
                </Link>

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
            <Link href="https://tally.so/r/nPAKBx">
              <Button className="w-full">
                <SunIcon className="mr-2 h-4 w-4" />
                Join Wailist
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
                {/* <span className="sr-only">Toggle navigation menu</span> */}
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <div className="flex h-full max-h-screen flex-col gap-4">
                <div className="flex h-[60px] items-center border-b px-2">
                  <Link className="flex items-center gap-2 font-semibold" href="/">
                    <span className="">donotfail.ai</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <div className="grid gap-2 px-0">
                    {/* <div className="relative">
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                        placeholder="Search images..."
                        type="search"
                      />
                    </div> */}
                    <nav className="space-y-2 w-[100%]">
                      <Collapsible className="w-[100%]">
                        <Link href="/spaces" className="w-[100%]">
                          <CollapsibleTrigger className="w-[100%]">
                            <span className="w-[100%] flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                              <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                <HomeIcon size={20} />
                              </span>
                              <span className="text-sm font-medium">Home</span>
                            </span>
                          </CollapsibleTrigger>
                        </Link>
                      </Collapsible>
                      <Collapsible>
                        <CollapsibleTrigger className="w-[100%]">
                          <span className="flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                            <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                              <EyeIcon size={20} />
                            </span>
                            <span className="text-sm font-medium">Explore</span>
                          </span>
                        </CollapsibleTrigger>

                        {
                          spaces?.map((item: any, index: number) => (
                            <Link key={index} href={`/spaces/${item?.id}`}>
                              <CollapsibleContent className="w-[100%]">
                                <span className="ml-6 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
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
                          <CollapsibleTrigger className="w-[100%]">
                            <span className="flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
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

                      <Link href="/quiz">
                        <Collapsible disabled>

                          <CollapsibleTrigger className="w-[100%]">
                            <span className="flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                              <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                <TextSearchIcon size={20} />
                              </span>
                              <div className="w-full flex justify-between">
                                <span className="text-sm font-medium">Quizzes</span>
                                <Badge className="ml-auto">Coming soon</Badge>
                              </div>
                            </span>
                          </CollapsibleTrigger>

                        </Collapsible>
                      </Link>

                      <Collapsible disabled>
                        <Link href="/">
                          <CollapsibleTrigger className="w-[100%]">
                            <span className="flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
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