"use client"
import Link from 'next/link'
import React from 'react'

type Props = {}

export function FooterLanding({ }: Props) {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            {/* <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 DoNotFailAI. All rights reserved.</p> */}
            <a href="mailto:founders@donotfail.ai" className="text-xs text-gray-500 dark:text-gray-400">
                founders@donotfail.ai
            </a>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    Terms of Service
                </Link>
                <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    Privacy
                </Link>
            </nav>
        </footer>
    )
}