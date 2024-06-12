"use client"
import React, { useState } from 'react'
import { TooltipProvider } from './ui/tooltip'
import { Nav } from './NavSidebar';
import { AlertCircle, Archive, ArchiveX, BookCheck, DatabaseZap, File, Inbox, MessagesSquare, Send, ShoppingCart, Trash2, Users2 } from 'lucide-react';
import { Separator } from './ui/separator';

type Props = {
    children: React.ReactNode;
}

const navLinks = [
    { title: "Dashboard", label: "", icon: Inbox, url: "/dashboard" },
    { title: "Spaces", label: "", icon: Archive, url: "/spaces" },
    { title: "Feature request", label: "", icon: MessagesSquare, url: "https://tally.so/r/mR4vPP" },
    // { title: "Sign Out", label: "", icon: Users2, url: "/sign-out" },
]

export function Sidebar3({
    children
}: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <TooltipProvider>
            <div className="flex h-full">
                <div
                    className={`flex flex-col h-full justify-between ${isCollapsed ? 'w-[50px]' : 'w-1/5'} transition-all duration-300 ease-in-out border-r border-gray-200`}
                    style={{ maxHeight: '100vh', position: 'fixed', top: 0, zIndex: 1000 }}
                >
                    <div>
                        {/* Existing sidebar content */}
                        <Nav
                            isCollapsed={isCollapsed}
                            links={[
                                { title: "donotfail.ai", label: "", icon: BookCheck, variant: "default", url: "/" },
                            ]}
                        />
                        <Separator />
                        {
                            navLinks.map((link, index) => (
                                <Nav
                                    key={index}
                                    isCollapsed={isCollapsed}
                                    links={[
                                        { title: link.title, label: link.label, icon: link.icon, variant: 'ghost', url: link.url },
                                    ]}
                                />
                            ))
                        }
                    </div>
                    <div className="px-0 py-0">
                        <Separator />
                        <div className="flex items-center justify-center">
                            <Nav
                                isCollapsed={isCollapsed}
                                links={[
                                    { title: "Profile", label: "", icon: Users2, variant: "ghost", url: "/profile" },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 ml-[50px]">
                    {children}
                </div>
            </div>
        </TooltipProvider>

    )
}
