import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ArrowDownIcon, ChevronLeft, ChevronLeftSquare } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

import { useEffect, useRef } from "react";
import { DeleteQuizQuestion, GetQuizQuestions, GetSlide } from "@/app/action";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import arrayShuffle from 'array-shuffle';
import Link from "next/link"

type Props = {
  slideId: string;
}

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

export function QuizzesPage(props: Props) {
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [isFlipped, setIsFlipped] = useState(false)

  const [questions, setQuestions] = useState<any[]>([]);
  const [slide, setSlide] = useState<any>({});
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});
  const [answer, setAnswer] = useState("");
  const [AnswerResponse, setAnswerResponse] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [confettiIsVisible, setConfettiIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setClient] = useState(false);
  const [timer, setTimer] = useState(15);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });
    setClient(true);
  }, []);

  useEffect(() => {
    console.log("Quizzes mounted");

    GetSlide(props.slideId)
      .then((response) => {
        console.log(response);
        setSlide(response);
      })
      .catch((error) => {
        console.log(error);
      });

    GetQuizQuestions(props.slideId)
      .then((response) => {
        console.log(response);
        if (response.status == "success") {
          let q = arrayShuffle(response.data);
          let qs = q.map((q: any, index: number) => ({
            ...q,
            index: index + 1,
            answeredCorrect: false
          }));

          setQuestions(qs);
          setSelectedQuestion(qs[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      console.log("Quizzes unmounted");
    };
  }, [props.slideId]);

  const selectQuestion = (question: any) => {
    setSelectedQuestion(question);
    setAnswer("");
  };

  const checkAnswer = () => {
    const ans = parseInt(answer.split("-")[1]);
    let correct = selectedQuestion.answer == selectedQuestion.answer_choices[ans];
    if (correct) {
      setSelectedQuestion((prev: any) => ({
        ...prev,
        answeredCorrect: correct
      }));
      setQuestions((prev: any) =>
        prev.map((q: any, index: number) =>
          index == selectedQuestion.index - 1 ? { ...q, answeredCorrect: correct } : q
        )
      );
      setAnswerResponse(true);
      setIsCorrect(true);
      setConfettiIsVisible(true);
    } else {
      setSelectedQuestion((prev: any) => ({
        ...prev,
        answeredCorrect: correct
      }));
      setAnswerResponse(true);
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    setConfettiIsVisible(false);
    let idx = selectedQuestion.index;
    let nextIdx = idx;
    while (nextIdx < questions.length && questions[nextIdx].answeredCorrect) {
      nextIdx++;
    }
    if (nextIdx < questions.length) {
      setSelectedQuestion(questions[nextIdx]);
    } else {
      const firstIncorrectQuestion = questions.find(q => !q.answeredCorrect);
      if (firstIncorrectQuestion) {
        setSelectedQuestion(firstIncorrectQuestion);
      } else {
        setIsDone(true);
      }
    }
    setAnswer("");
    setAnswerResponse(false);
    setIsCorrect(false);
    resetTimer();
  };

  const removeQuestion = () => {
    DeleteQuizQuestion(selectedQuestion.id)
      .then((response) => {
        if (response.status == "success") {
          let newQuestions = questions.filter((q) => q.id != selectedQuestion.id);
          newQuestions = newQuestions.map((q, index) => ({
            ...q,
            index: index + 1
          }));
          setQuestions(newQuestions);
          nextQuestion();
          setPopoverIsOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          intervalRef.current = null;
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(15);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/4 p-4 bg-gray-100">
        <Link href={`/slides/${slide.id}`} className="flex gap-2">
          <ChevronLeft className="pt-1" /> <h2 className="mb-4 text-lg font-semibold">Back to slides</h2>
        </Link>

        {/* <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
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
        </Select> */}
        <div className="md:flex flex-wrap gap-2 pl-1 hidden">
          {questions?.map((qq, index) => (
            <Button key={index + 1} className={`w-8 h-8 text-xs ${qq.answeredCorrect ? 'bg-green-500' : ''}`} onClick={() => selectQuestion(qq)}>
              {index + 1}
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
                {questions?.map((qq, index) => (
                  <Button key={index + 1} className={`w-8 h-8 text-xs ${qq.answeredCorrect} && 'bg-green-400'`} onClick={() => selectQuestion(qq)}>
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <div className="w-full md:w-3/4 p-8">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <h1 className="text-xl font-bold">Question {selectedQuestion?.index}</h1>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-4 md:mt-0">
            <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
              <PopoverTrigger className="mt-4 md:mt-0" asChild>
                <Button variant="outline">
                  Remove Question
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col">
                <p>Are you sure you want to remove this question?</p>
                <div className="flex">
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white ml-auto"
                    onClick={removeQuestion}
                  >
                    Yes
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 justify-end sm:justify-end">
              <ClockIcon className="w-6 h-6" />
              <span>{timer}</span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-6">
              {selectedQuestion?.question}
            </h3>
            <form className="space-y-4">

              <RadioGroup
                className="mb-4"
                value={answer}
                onValueChange={(value) => setAnswer(value)}
              >
                {selectedQuestion?.answer_choices?.map((option: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <RadioGroupItem value={`r-${index}`} id={`r-${index}`} />
                    <Label htmlFor={`r-${index}`} className="ml-2">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {confettiIsVisible && isClient && <Confetti />}
              {AnswerResponse && (
                isCorrect ? (
                  <Alert
                    variant="destructive"
                    className="mt-2 w-[60%] text-green-600 border-green-600"
                  >
                    <CheckCircle className="h-4 w-4" color="green" />
                    <AlertTitle>Correct</AlertTitle>
                    <AlertDescription>
                      You have answered the question correctly.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert
                    variant="destructive"
                    className="mt-2 w-[60%] text-red-600 border-red-600"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Incorrect</AlertTitle>
                    <AlertDescription>
                      <p>You have answered the question incorrectly.</p>
                      <p>Answer : {selectedQuestion?.answer}</p>
                    </AlertDescription>
                  </Alert>
                )
              )}
            </form>
          </div>
          {AnswerResponse ? (
            <Button className="mt-4" onClick={nextQuestion}>
              Next Question
            </Button>
          ) : (
            <Button className="mt-4" onClick={checkAnswer}>
              Submit Answer
            </Button>
          )}
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
