"use client"
import React, { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable'
import { TooltipProvider } from './ui/tooltip'
import { Nav } from './NavSidebar';
import { AlertCircle, Archive, ArchiveX, File, Inbox, MessagesSquare, Send, ShoppingCart, Trash2, Users2, ZapIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from "@/lib/utils"
import { Button } from './ui/button';

type Props = {}

export function Sidebar3({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <TooltipProvider>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full overflow-scroll"
            >
                <ResizablePanel
                    collapsible={true}
                    collapsedSize={4}
                    minSize={15}
                    maxSize={20}
                    onCollapse={() => {
                        setIsCollapsed(prev => !prev)
                    }}
                    className={cn(
                        isCollapsed &&
                        "min-w-[50px] transition-all duration-300 ease-in-out"
                    )}
                >
                    {/* title */}
                    <div className="flex items-center justify-between px-4 py-2">
                        <h1 className="text-lg font-semibold">donotfail.ai</h1>
                    </div>

                    <Separator />
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Inbox",
                                label: "128",
                                icon: Inbox,
                                variant: "default",
                            },
                            {
                                title: "Drafts",
                                label: "9",
                                icon: File,
                                variant: "ghost",
                            },
                            {
                                title: "Sent",
                                label: "",
                                icon: Send,
                                variant: "ghost",
                            },
                            {
                                title: "Junk",
                                label: "23",
                                icon: ArchiveX,
                                variant: "ghost",
                            },
                            {
                                title: "Trash",
                                label: "",
                                icon: Trash2,
                                variant: "ghost",
                            },
                            {
                                title: "Archive",
                                label: "",
                                icon: Archive,
                                variant: "ghost",
                            },
                        ]}
                    />
                    <Separator />
                    <Nav
                        isCollapsed={isCollapsed}
                        links={[
                            {
                                title: "Social",
                                label: "972",
                                icon: Users2,
                                variant: "ghost",
                            },
                            {
                                title: "Updates",
                                label: "342",
                                icon: AlertCircle,
                                variant: "ghost",
                            },
                            {
                                title: "Forums",
                                label: "128",
                                icon: MessagesSquare,
                                variant: "ghost",
                            },
                            {
                                title: "Shopping",
                                label: "8",
                                icon: ShoppingCart,
                                variant: "ghost",
                            },
                            {
                                title: "Promotions",
                                label: "21",
                                icon: Archive,
                                variant: "ghost",
                            },
                        ]}
                    />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={85} className='overflow-auto'>
                    {children}
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>

    )
}
