import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ArrowDownIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

const accounts = [
  {
    email: "all",
    label: "All accounts",
    icon: (
      <svg
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
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    email: "[email protected]",
    label: " [email protected]",
    icon: (
      <svg
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
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
]

export function QuizzesPage() {
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 p-4 bg-gray-100">
        <h2 className="mb-4 text-lg font-semibold">Quizzes</h2>
        <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger
            className={cn(
              "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 mb-4",
            )}
            aria-label="Select account"
          >
            <SelectValue placeholder="Select an account">
              {accounts.find((account) => account.email === selectedAccount)?.icon}
              <span className={cn("ml-2")}>
                {
                  accounts.find((account) => account.email === selectedAccount)
                    ?.label
                }
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.email} value={account.email}>
                <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  {account.icon}
                  {account.email}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="md:flex flex-wrap gap-2 pl-1 hidden">
          {Array.from({ length: 62 }, (_, i) => (
            <Button key={i + 1} className="w-8 h-8 text-xs">
              {i + 1}
            </Button>
          ))}
        </div>
        <div className="md:hidden">
          <Collapsible>
            <div className="flex items-center justify-between space-x-4 px-1">
              <h4 className="text-sm font-semibold">62 Flashcards</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ArrowDownIcon className="w-4 h-4" /><span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="flex flex-wrap gap-2 pl-1">
                {Array.from({ length: 62 }, (_, i) => (
                  <Button key={i + 1} className="w-8 h-8 text-xs">
                    {i + 1}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <div className="w-full md:w-3/4 p-8">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-xl font-bold">Flashcard 1</h1>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-4 md:mt-0">
            <Button variant="outline">Remove Flashcard</Button>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 justify-end sm:justify-end">
              <ClockIcon className="w-6 h-6" />
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-6">
              What is one practical application of multimodal dialogue systems?
            </h3>
            <form className="space-y-4">
              <RadioGroup>
                <div className="flex items-center">
                  <RadioGroupItem id="opt1" value="battery" />
                  <Label htmlFor="opt1" className="ml-2">
                    Battery optimization
                  </Label>
                </div>
              </RadioGroup>

              <RadioGroup>
                <div className="flex items-center">
                  <RadioGroupItem id="opt2" value="language" />
                  <Label htmlFor="opt2" className="ml-2">
                    Understanding and generating human language across different modes
                  </Label>
                </div>
              </RadioGroup>

              <RadioGroup>
                <div className="flex items-center">
                  <RadioGroupItem id="opt3" value="network" />
                  <Label htmlFor="opt3" className="ml-2">
                    Increasing network speed
                  </Label>
                </div>
              </RadioGroup>

              <RadioGroup>
                <div className="flex items-center">
                  <RadioGroupItem id="opt4" value="effects" />
                  <Label htmlFor="opt4" className="ml-2">
                    Enhancing visual effects in movies
                  </Label>
                </div>
              </RadioGroup>
            </form>
          </div>
          <div className="flex justify-between">
            <Button onClick={() => setIsFlipped(!isFlipped)}>Show Answer</Button>
            <Button>Next Flashcard</Button>
          </div>
        </div>
      </div>
    </div >
  )
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
