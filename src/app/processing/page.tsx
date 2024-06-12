"use client"
import Spaces from '@/components/spaces'
import React from 'react'
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";

type Props = {}

const Page = (props: Props) => {
    return (
        <div className='w-full h-full'>
            <Sidebar3>
                <Spaces />
            </Sidebar3>
        </div>
    )
}

export default Page