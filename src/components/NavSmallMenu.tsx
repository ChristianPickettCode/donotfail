"use client"
import React, { use, useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import Link from 'next/link'
import { HomeIcon, MenuIcon } from 'lucide-react'
import { GetSpaces } from '@/app/action'

type Props = {}

const NavSmallMenu = (props: Props) => {

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
                // console.log(res)
                setSpaces(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="fixed top-2 left-4"><MenuIcon size={16} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side='right'>
                <Link href="/">
                    <DropdownMenuLabel>donotfail.ai</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />

                {/* <DropdownMenuItem>
                        Explore
                    </DropdownMenuItem> */}
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <span>Explore</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {
                                spaces.map((space: any, index) => (
                                    <Link key={index} href={`/spaces/${space.id}`}>
                                        <DropdownMenuItem>
                                            {space.name}
                                        </DropdownMenuItem>
                                    </Link>
                                ))
                            }
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <Link href="/spaces">
                    <DropdownMenuItem>
                        Flashcards
                    </DropdownMenuItem>
                </Link>

                {/* <Link href="/spaces">
                    <DropdownMenuItem>
                        Quizzes
                    </DropdownMenuItem>
                </Link> */}

                <Link href="/spaces">
                    <DropdownMenuItem>
                        Notes
                    </DropdownMenuItem>
                </Link>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default NavSmallMenu