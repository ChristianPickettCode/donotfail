"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "./ui/card"
import { Book, BookCheckIcon, BookHeartIcon } from "lucide-react"

import { useAuth } from "@clerk/nextjs";
import { HeaderLanding } from "./headerLanding";
import { FooterLanding } from "./footerLanding";

const uniArray = [
  { name: "Stanford", logo: "/unis/stanford.png" },
  { name: "UCLA", logo: "/unis/ucla.png" },
  { name: "UofTA", logo: "/unis/uofta.png" },
  { name: "McGill", logo: "/unis/mcgill.png" },
  { name: "UofT", logo: "/unis/uoft.png" },
  { name: "VU", logo: "/unis/vu.png" },
  { name: "UVA", logo: "/unis/uva.png" },
]
export function Landing4() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeaderLanding isLoaded={isLoaded} userId={userId!} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 md:flex md:flex-row">
          <div className="container px-4 md:px-6 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Accelerate your learning
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Missed a class? Get AI-generated notes, explanations, quizzes, flashcards and more just from your <u>slides</u>.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                // href={isLoaded && userId ? '/dashboard' : '/early-access'}
                href="/dashboard"
                // href={'https://tally.so/r/nWoDXQ'}
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                prefetch={false}
              >
                {/* Start now for free */}
                {/* {isLoaded && userId ? 'Dashboard' : 'Get early access'} */}
                Dashboard
              </Link>
              {/* <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                prefetch={false}
              >
                Take a Tour
              </Link> */}
              {/* # no credit card required */}
              <div className="text-gray-500 dark:text-gray-400 mt-2">
                <p>No credit card required.</p>
              </div>
            </div>

          </div>
          {/* <img
            src="/placeholder.svg"
            width="500"
            height="310"
            alt="Hero"
            className="mx-4 my-2 aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          /> */}

          <video
            width="100%"
            height="auto"
            className="w-full mt-6 aspect-video overflow-hidden rounded-xl object-cover object-center sm:mx-6 lg:order-last"
            autoPlay
            loop
            muted
          >
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>


        </section>
        {/* <section className="w-full py-12 md:py-14 lg:py-22 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="space-y-2 text-center">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Used By Students At</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Trusted by students at the top universities in the world.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {uniArray.map((uni, index) => (
                  <Card key={index} className="flex items-center justify-center p-2">
                    <img
                      src={uni.logo}
                      width="120"
                      height="50"
                      alt="Logo"
                      className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                    />
                  </Card>
                ))}
                <Card className="flex items-center justify-center p-2">
                  <Link href="#" className="flex items-center justify-center p-2">
                    <span className="text-3xl">+</span>
                  </Link>
                </Card>

              </div>
            </div>
          </div>
        </section> */}
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container px-4 md:px-6 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Study Smarter, Not Harder</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A platform to streamlines your study process, helping you learn more efficiently.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="grid gap-2">
                <UploadIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Upload Slides</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Simply upload your course slides, and our AI gets to work.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <ScanIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Analyze Content</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our AI analyzes the slides and extracts key information.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <StickyNoteIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Generate Notes</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Detailed notes are generated, summarizing the content.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <PuzzleIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Create Quizzes</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Customized quizzes are created to test your understanding.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <FileAudioIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Convert to Audio</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Notes are converted into natural-sounding audio for on-the-go learning.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <ActivityIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Voice Assistant</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our AI assistant helps you navigate and explain slides easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">donotfail.ai Solutions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Unlock your full potential with our powerful AI-driven study tools.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="grid gap-2">
                <StickyNoteIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Smart Note Generation</h4>
                  <p className="text-gray-500 dark:text-gray-400">Quickly turns your slides into detailed notes.</p>
                </div>
              </div>
              <div className="grid gap-2">
                <PuzzleIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Custom Quizzes</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Automatically generates quizzes to test your understanding.
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <HeadphonesIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Clear Audio</h4>
                  <p className="text-gray-500 dark:text-gray-400">Converts notes into natural-sounding audio.</p>
                </div>
              </div>
              <div className="grid gap-2">
                <MicIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Voice Assistant</h4>
                  <p className="text-gray-500 dark:text-gray-400">Helps you navigate and explain slides easily.</p>
                </div>
              </div>
              <div className="grid gap-2">
                <RocketIcon className="w-6 h-6 shrink-0 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="text-base font-bold">Fast Results</h4>
                  <p className="text-gray-500 dark:text-gray-400">Upload slides and get immediate, accurate results.</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  See how donotfail.ai has helped students like you achieve their academic goals.
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    &ldquo;Missing a few classes used to set me back, but with donotfail.ai, I can easily catch up. The explanations are clear and detailed, making it easy to understand even the toughest subjects.&ldquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold">Emily R.</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Computer Science Student</div>
                  </div>
                </div>
                <div className="mt-8 md:mt-0 md:w-1/2 md:ml-4">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    &ldquo;I have seen a significant improvement in my grades since using donotfail.ai. The explanations make complex topics much more accessible and easier to grasp&ldquo;
                  </blockquote>
                  <div>
                    <div className="font-semibold">Michael L.</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Biology Major</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing Plans</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose the plan that best fits your needs.
              </p>
            </div>
          </div>
        </section> */}
      </main>
      <FooterLanding />
    </div>
  )
}

function ActivityIcon(props: any) {
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
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  )
}


function FileAudioIcon(props: any) {
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
      <path d="M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0" />
    </svg>
  )
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}



function PuzzleIcon(props: any) {
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
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  )
}



function ScanIcon(props: any) {
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
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}


function StickyNoteIcon(props: any) {
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
      <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
      <path d="M15 3v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function UploadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

