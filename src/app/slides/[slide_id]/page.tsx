"use client"
import { Slides } from "@/components/slides";
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";

export default function Page({ params }: any) {
    const { push } = useRouter()
    const { isLoaded, userId } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;
        if (!userId) {
            push('/sign-in')
        }
    }, [isLoaded, userId])

    return (
        <Sidebar3>
            <Slides params={params} />
        </Sidebar3>
    );
}
