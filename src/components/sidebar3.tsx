"use client"
import React, { useState } from 'react'
import { TooltipProvider } from './ui/tooltip'
import { Nav } from './NavSidebar';
import { AlertCircle, Archive, ArchiveX, BookCheck, File, Inbox, MessagesSquare, Send, ShoppingCart, Trash2, Users2 } from 'lucide-react';
import { Separator } from './ui/separator';

type Props = {}

export function Sidebar3({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isCollapsed, setIsCollapsed] = useState(true)
    return (
        <TooltipProvider>
            <div className="flex h-full overflow-scroll">
                <div
                    className={`flex flex-col h-full justify-between ${isCollapsed ? 'w-[50px]' : 'w-1/5'} transition-all duration-300 ease-in-out border-r border-gray-200`}
                    onDoubleClick={() => {
                        setIsCollapsed(prev => !prev);
                    }}
                >
                    <div>
                        {/* Existing sidebar content */}
                        <Nav
                            isCollapsed={isCollapsed}
                            links={[
                                { title: "donotfail.ai", label: "", icon: BookCheck, variant: "default" },
                            ]}
                        />
                        <Separator />
                        <Nav
                            isCollapsed={isCollapsed}
                            links={[
                                { title: "Inbox", label: "128", icon: Inbox, variant: "ghost" },
                                { title: "Drafts", label: "9", icon: File, variant: "ghost" },
                                { title: "Sent", label: "", icon: Send, variant: "ghost" },
                                { title: "Junk", label: "23", icon: ArchiveX, variant: "ghost" },
                                { title: "Trash", label: "", icon: Trash2, variant: "ghost" },
                                { title: "Archive", label: "", icon: Archive, variant: "ghost" },
                            ]}
                        />
                        <Separator />
                        <Nav
                            isCollapsed={isCollapsed}
                            links={[
                                { title: "Social", label: "972", icon: Users2, variant: "ghost" },
                                { title: "Updates", label: "342", icon: AlertCircle, variant: "ghost" },
                                { title: "Forums", label: "128", icon: MessagesSquare, variant: "ghost" },
                                { title: "Shopping", label: "8", icon: ShoppingCart, variant: "ghost" },
                                { title: "Promotions", label: "21", icon: Archive, variant: "ghost" },
                            ]}
                        />
                    </div>
                    <div className="px-0 py-0">
                        <Separator />
                        <div className="flex items-center justify-center">
                            <Nav
                                isCollapsed={isCollapsed}
                                links={[
                                    { title: "Social", label: "972", icon: Users2, variant: "ghost" },
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
