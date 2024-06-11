"use client"
import { Slides } from "@/components/slides";
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";

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
        <Sidebar3
            navLinks={[
                { title: "Dashboard", label: "", icon: Archive, url: "/spaces" },
                { title: "Spaces", label: "", icon: ArchiveX, url: "/spaces" },
                { title: "Feature request", label: "", icon: MessagesSquare, url: "https://tally.so/r/mR4vPP" },
                { title: "Sign Out", label: "", icon: Users2, url: "/sign-out" },
            ]}
        >
            <Slides params={params} />
        </Sidebar3>
    );
}
