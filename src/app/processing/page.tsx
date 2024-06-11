"use client"
import Spaces from '@/components/spaces'
import React from 'react'
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";

type Props = {}

const Page = (props: Props) => {
    return (
        <div className='w-full h-full'>
            <Sidebar3
                navLinks={[
                    { title: "Dashboard", label: "", icon: Archive, url: "/spaces" },
                    { title: "Spaces", label: "", icon: ArchiveX, url: "/spaces" },
                    { title: "Feature request", label: "", icon: MessagesSquare, url: "https://tally.so/r/mR4vPP" },
                    { title: "Sign Out", label: "", icon: Users2, url: "/sign-out" },
                ]}
            >
                <Spaces />
            </Sidebar3>
        </div>
    )
}

export default Page