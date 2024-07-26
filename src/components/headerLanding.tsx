"use client"

import { BookCheckIcon, MenuIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type Props = {
    isLoaded: boolean
    userId: string
}

export function HeaderLanding({ isLoaded, userId }: Props) {
    return (
        <header className="flex items-center justify-between px-4 md:px-6 h-16 border-b">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <BookCheckIcon className="h-6 w-6" />
                <span className="font-bold text-lg">DoNotFail.ai</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
                {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            How It Works
          </Link> */}
                <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Features
                </Link>
                {/* <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Testimonials
          </Link> */}
                <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Pricing
                </Link>
                {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Dashboard
          </Link> */}

                {/* /sign-up */}
                <Link
                    href={isLoaded && userId ? '/dashboard' : '/early-access'}
                    // href={'https://tally.so/r/nWoDXQ'}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                >
                    {isLoaded && userId ? 'Dashboard' : 'Get early access'}
                    {/* Get early access */}
                </Link>
            </nav>
            <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation</span>
            </Button>
        </header>
    )
}

export default HeaderLanding