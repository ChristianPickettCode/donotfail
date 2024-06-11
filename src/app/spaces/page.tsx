"use client"
import { Gallery } from "@/components/gallery";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import Spaces from "@/components/spaces";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useClerk } from '@clerk/nextjs';

export default function Page() {
    const { push } = useRouter()
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { signOut } = useClerk();

    useEffect(() => {
        if (!isLoaded) return;
        if (!userId) {
            push('/sign-in')
        }
    }, [isLoaded, userId])

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
                    <DropdownMenuItem>
                        <Link href="/spaces">Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="https://tally.so/r/mR4vPP">Feature request</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/' })} >
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Spaces />
        </>

    );
}
