"use client"
import { Gallery } from "@/components/gallery";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import { SpaceSlides } from "@/components/spaceSlides";
import Spaces from "@/components/spaces";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from "next/link";

type Props = {
    params: any
}

export default function Page(props: Props) {
    console.log(props)
    return (
        // <Sidebar2>
        // {/* <Gallery /> */ }
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="fixed top-2 left-4"><MenuIcon size={16} /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side='right'>
                    <Link href="/">
                        <DropdownMenuLabel>donotfail.ai</DropdownMenuLabel>
                    </Link>
                    <DropdownMenuSeparator />

                    <Link href="/spaces">
                        <DropdownMenuItem>
                            Home
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
            <SpaceSlides spaceId={props.params.space_id} />
        </>
        // </Sidebar2>

    );
}
