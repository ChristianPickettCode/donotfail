"use client"
import { Gallery } from "@/components/gallery";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import Spaces from "@/components/spaces";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from "next/link";

export default function Page() {
    return (
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
            <Spaces />
        </>

    );
}
