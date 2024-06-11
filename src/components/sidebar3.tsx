"use client"
import React, { useState } from 'react'
import { TooltipProvider } from './ui/tooltip'
import { Nav } from './NavSidebar';
import { AlertCircle, Archive, ArchiveX, BookCheck, File, Inbox, MessagesSquare, Send, ShoppingCart, Trash2, Users2 } from 'lucide-react';
import { Separator } from './ui/separator';

type Props = {
    children: React.ReactNode;
    navLinks: {
        title: string
        label?: string
        url?: string
        icon: any
    }[]
}

export function Sidebar3({
    children, navLinks
}: Props) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <TooltipProvider>
            <div className="flex h-full">
                <div
                    className={`flex flex-col h-full justify-between ${isCollapsed ? 'w-[50px]' : 'w-1/5'} transition-all duration-300 ease-in-out border-r border-gray-200`}
                    style={{ maxHeight: '100vh', overflowY: 'auto' }}
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
                                    { title: "Social", label: "", icon: Users2, variant: "ghost" },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </TooltipProvider>

    )
}
