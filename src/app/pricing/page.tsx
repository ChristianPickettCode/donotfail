"use client"
import Spaces from '@/components/spaces'
import React from 'react'
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";
import { PricingSection } from '@/components/pricing-section';
import { useAuth } from '@clerk/nextjs';
import HeaderLanding from '@/components/headerLanding';
import { FooterLanding } from '@/components/footerLanding';

type Props = {}

const Page = (props: Props) => {
    const { isLoaded, userId } = useAuth();

    return (
        <>
            <HeaderLanding isLoaded={isLoaded} userId={userId!} />
            <PricingSection />
            <FooterLanding />
        </>
    )
}

export default Page