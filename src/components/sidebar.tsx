"use client"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { EyeIcon, HomeIcon, PencilLine, TextSearchIcon, WalletCardsIcon } from 'lucide-react';

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetSlides } from "@/app/action";
import { Badge } from "./ui/badge";

export function Sidebar({
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
        <div className="flex">
            <aside className="sticky top-0 h-screen min-w-56 max-w-56 bg-gray-100 text-gray-800 p-4">
                <div className="flex items-center mb-2 space-x-1">
                    <Link href="/">
                        <h1 className='text-lg font-bold'>donotfail.ai</h1>
                    </Link>
                </div>
                <nav className="space-y-2">
                    <Collapsible>
                        <Link href="/gallery">
                            <CollapsibleTrigger>
                                <span className="w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
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
                            <span className="w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
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
                                <span className="w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                                    <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                        <WalletCardsIcon size={20} />
                                    </span>
                                    <span className="text-sm font-medium">Flashcards <Badge>Coming soon</Badge></span>
                                </span>
                            </CollapsibleTrigger>
                        </Link>
                    </Collapsible>

                    <Collapsible disabled>
                        <Link href="/">
                            <CollapsibleTrigger>
                                <span className="w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                                    <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                        <TextSearchIcon size={20} />
                                    </span>
                                    <span className="text-sm font-medium">Quizzes <Badge>Coming soon</Badge></span>
                                </span>
                            </CollapsibleTrigger>
                        </Link>
                    </Collapsible>

                    <Collapsible disabled>
                        <Link href="/">
                            <CollapsibleTrigger>
                                <span className="w-40 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 text-left">
                                    <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
                                        <PencilLine size={20} />
                                    </span>
                                    <span className="text-sm font-medium">Notes <Badge>Coming soon</Badge></span>
                                </span>
                            </CollapsibleTrigger>
                        </Link>
                    </Collapsible>

                </nav>
            </aside>
            <main className="flex-grow">
                {children}
            </main>
        </div>
    )
}