/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/ByEAbMT1wO9
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 flex-grow">
        <div className="container mx-auto grid max-w-5xl items-center gap-8 px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple and Flexible Pricing</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Choose the plan that works best for you.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For individuals looking for basic features.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Note generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Quiz generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Audio conversion</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>For teams looking for advanced features.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">$19.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Note generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Quiz generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Audio conversion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Voice assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
