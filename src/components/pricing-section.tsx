import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 flex-grow">
        <div className="container mx-auto grid max-w-5xl items-center gap-8 px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple and Affordable Pricing</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Choose the plan that works best for you.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
            <Card className="border-2 border-gray-200 dark:border-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                {/* <CardDescription>For individuals looking for basic features.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">Free</span>
                  {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>100 Credits Per Month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Note generation</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Quiz generation</span>
                  </div> */}
                  {/* <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Audio conversion</span>
                  </div> */}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href="/sign-in" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="border-2 border-gray-200 dark:border-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                {/* <CardDescription>For individuals looking for basic features.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>400 Credits Per Month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Note generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Quiz generation</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>Audio conversion</span>
                  </div> */}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href="/sign-in" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="border-2 border-gray-200 dark:border-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                {/* <CardDescription>For teams looking for advanced features.</CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">$19.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span>1000 Credits Per Month</span>
                  </div>
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
                    <span>Audio generation</span>
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
              <CardFooter className="mt-auto">
                <Link href="/sign-in" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div >
      </section >
    </div >
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
