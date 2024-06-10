"use client"
import CommandBar from "@/components/commandbar";
import NavSmallMenu from "@/components/NavSmallMenu";
import { Sidebar } from "@/components/sidebar";
import { Sidebar2 } from "@/components/sidebar2";
import { Slides } from "@/components/slides";
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page({ params }: any) {
    const { push } = useRouter()
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;
        if (!userId) {
            push('/sign-in')
        }
    }, [isLoaded, userId])

    return (
        <>
            {/* <NavSmallMenu /> */}
            <Slides params={params} />
            {/* <CommandBar /> */}
        </>
    );
}
