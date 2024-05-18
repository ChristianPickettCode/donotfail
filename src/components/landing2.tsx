import Link from "next/link"

export function Landing2() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl/none">
              {/* Learn Faster with AI */}
              Donotfail.ai
            </h3>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {/* Learn Faster with AI */}
              Accelerated learning
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {/* Enhance your learning experience with our AI-powered platform. Get personalized notes, explanations, and
              guidance tailored to your needs, helping you understand complex concepts more easily and learn at an
              accelerated pace. */}

              {/* The platform uses AI to boost your learning by providing custom notes, clear explanations, and guidance. It helps you grasp difficult topics faster. Features include AI-assisted explanations of slides, note creation, flashcard and quiz generation, and a virtual AI tutor for personalized support. */}
              Generate lecture notes, flashcards, quizzes, just from your <u>slides</u>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-gray-500 dark:text-gray-400">
            <ul className="space-y-2">
              {/* <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Explain your slides with AI
              </li> */}
              {/* <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Get summarized notes
              </li> */}
              {/* <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Generate notes
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Generate flashcards
              </li> */}
            </ul>
            <ul className="space-y-2">
              {/* <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Generate quizzes
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                AI Tutor
              </li> */}
            </ul>
            {/* <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Personalized learning paths
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Interactive AI-powered exercises
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                Analyze your learning progress
              </li>
            </ul> */}
          </div>
          <div className="space-x-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/spaces"
            >
              Dashboard
            </Link>
            {/* <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/us"
            >
              Learn More
            </Link> */}
          </div>
        </div>
      </div>
    </section>
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
