import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export function Landing() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Learn with AI-Powered Notes and Explanations
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Upload your slides, and our AI will generate personalized notes and explanations to help you understand the material better.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/gallery"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/us"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <img
              alt="AI-Powered Slides"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
              height="550"
              src="/illustration3.svg"
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                AI-Powered Learning
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Personalized Learning for Your Success
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered platform provides personalized learning experiences tailored to your needs and learning style.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <LightbulbIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-lg font-bold">Adaptive Notes</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The AI generates notes and explanations adjusted to your understanding and progress.
              </p>
            </div>
            <div className="grid gap-1">
              <BarChartIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-lg font-bold">Interactive Feedback</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get instant feedback and guidance through chat or voice assistant to identify and address your strengths and weaknesses.
              </p>
            </div>
            <div className="grid gap-1">
              <SparklesIcon className="h-8 w-8 text-gray-900 dark:text-gray-50" />
              <h3 className="text-lg font-bold">Customized Learning</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The AI creates a personalized learning plan based on your slides and input to help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Students Say</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from students who have used our AI-powered platform.
            </p>
          </div>
          <div className="divide-y rounded-lg border">
            <div className="grid w-full grid-cols-1 items-stretch justify-center divide-y md:grid-cols-2 md:divide-y-0 md:divide-x">
              <div className="mx-auto flex w-full flex-col items-start justify-center p-6 sm:p-8">
                <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
                  The AI-generated notes and explanations helped me understand complex concepts in a way that
                  traditional materials couldnt. I saw a significant improvement in my grades.
                </blockquote>
                <div className="mt-4 flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.svg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Jane Smith</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">High School Student</div>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex w-full flex-col items-start justify-center p-6 sm:p-8">
                <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal">
                  I was struggling with a complex subject, but the AIs personalized notes and the ability to ask
                  questions through chat or voice assistant helped me catch up and even excel.
                </blockquote>
                <div className="mt-4 flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">College Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function BarChartIcon(props: any) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function LightbulbIcon(props: any) {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}


function SparklesIcon(props: any) {
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
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
