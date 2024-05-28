"use client"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ConfettiExplosion from 'react-confetti-explosion';
import { useEffect, useRef, useState, MutableRefObject } from "react";
import { DeleteQuizQuestion, GetQuizQuestions, GetSlide, GetSpace } from "@/app/action";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Check, CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import arrayShuffle from 'array-shuffle';

type Props = {
  slideId: string;
}

const Quizzes = (props: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [slide, setSlide] = useState<any>({});
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});

  const [answer, setAnswer] = useState("");
  const [AnswerResponse, setAnswerResponse] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [isDone, setIsDone] = useState(false);

  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [confettiIsVisible, setConfettiIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height,
    });
    setClient(true);
  }, []);

  useEffect(() => {
    console.log("Quizzes mounted");

    GetSlide(props.slideId)
      .then((response) => {
        console.log(response);
        setSlide(response)
      })
      .catch((error) => {
        console.log(error);
      })

    GetQuizQuestions(props.slideId)
      .then((response) => {
        console.log(response);
        if (response.status == "success") {
          // add index to each question
          let q = arrayShuffle(response.data)
          let qs = q.map((q: any, index: number) => {
            return {
              ...q,
              index: index + 1,
              answeredCorrect: false
            }
          })

          setQuestions(qs)
          setSelectedQuestion(qs[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      })

    return () => {
      // console.log("Quizzes unmounted");
    }
  }, [props.slideId])

  const selectQuestion = (question: any) => {
    setSelectedQuestion(question);
    setAnswer("");
  }

  const checkAnswer = () => {
    // parse answer
    const ans = parseInt(answer.split("-")[1]);
    console.log("Checking answer", ans);

    console.log("Selected question: ", selectedQuestion);

    let correct = selectedQuestion.answer == selectedQuestion.answer_choices[ans];
    console.log("Correct: ", correct);
    if (correct) {
      console.log("Correct answer");
      setSelectedQuestion((prev: any) => {
        return {
          ...prev,
          answeredCorrect: correct
        }
      })
      setQuestions((prev: any) => {
        return prev.map((q: any, index: number) => {
          if (index == (selectedQuestion.index - 1)) {
            return {
              ...q,
              answeredCorrect: correct
            }
          }
          return q;
        })
      })
      setAnswerResponse(true);
      setIsCorrect(true);
      console.log("confettiIsVisible", confettiIsVisible);
      setConfettiIsVisible(true);

    } else {
      console.log("Incorrect answer");
      setSelectedQuestion((prev: any) => {
        return {
          ...prev,
          answeredCorrect: correct
        }
      })
      setAnswerResponse(true);
      setIsCorrect(false);
    }
  }

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
      // Go to the first not correctly answered question
      const firstIncorrectQuestion = questions.find(q => !q.answeredCorrect);
      if (firstIncorrectQuestion) {
        setSelectedQuestion(firstIncorrectQuestion);
      } else {
        // All questions answered correctly
        setIsDone(true);
      }
    }
    setAnswer("");
    setAnswerResponse(false);
    setIsCorrect(false);
    resetTimer()
  }

  const removeQuestion = () => {
    console.log("Remove question");
    DeleteQuizQuestion(selectedQuestion.id)
      .then((response) => {
        console.log(response);
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
      })
  }

  const [timer, setTimer] = useState(15);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          intervalRef.current = null;
          console.log("Timer stopped");
          return 0;
        }
        return prevTimer - 1;
      });
      console.log("Timer tick");
    }, 1000);

    console.log("Timer started");
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
      intervalRef.current = null;
    }
    console.log("Timer stopped");
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(15);
    startTimer();
    console.log("Timer reset");
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
      console.log("Cleanup: Timer stopped");
    };
  }, []);


  return (
    <div className="flex flex-col h-screen md:flex-row">
      <aside className="w-full md:w-1/5 bg-gray-100 p-4 overflow-y-auto">
        <nav>
          <ul className="flex flex-wrap">
            {
              questions?.map((qq, index) => (
                <li key={index}>
                  <div className={`m-1 w-8 h-8 ${qq.answeredCorrect ? 'bg-green-400 text-white' : 'bg-white text-black'}  rounded-full flex items-center justify-center`}>
                    {index + 1}
                  </div>
                </li>
              ))
            }
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 flex flex-col">


        {
          questions.length > 0 ? (
            <>

              <div className="flex-1 flex items-center justify-center">
                {
                  !isDone ? (
                    <>
                      <header className='absolute top-4 right-4'>
                        <Popover open={popoverIsOpen} onOpenChange={setPopoverIsOpen}>
                          <PopoverTrigger className="w-32 mt-4 md:mt-0">
                            Remove Question
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col">
                            {/* <PopoverArrow /> */}
                            <p>Are you sure you want to remove this question?</p>
                            <div className="flex">
                              <Button className="bg-red-500 hover:bg-red-700 text-white ml-auto" onClick={removeQuestion}>Yes</Button>
                            </div>
                          </PopoverContent>
                        </Popover>

                        {/* Add timer */}
                        <div className="mt-2 flex space-x-2 justify-center">
                          <span>Timer</span>
                          <span>{timer}</span>
                        </div>

                      </header>


                      <section className="flex flex-col items-center w-[80%]">
                        <h2 className="text-xl font-semibold mb-2">Question {selectedQuestion?.index}</h2>
                        <p className="text-lg mb-4">{selectedQuestion?.question}</p>
                        {/* <Input className="mb-4" placeholder="Type your answer here" /> */}
                        <RadioGroup className="mb-4" value={answer} onValueChange={(value) => setAnswer(value)}>
                          {
                            selectedQuestion?.answer_choices?.map((option: any, index: number) => (

                              <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={`r-${index}`} id={`r-${index}`} />
                                <Label htmlFor={`r-${index}`}>{option}</Label>
                              </div>
                            ))
                          }
                        </RadioGroup>

                        {confettiIsVisible && isClient && <Confetti />}
                        {
                          AnswerResponse ?

                            isCorrect ? (

                              <Alert variant="destructive" className="mt-2 w-[60%] text-green-600 border-green-600">
                                <CheckCircle className="h-4 w-4" color="green" />
                                <AlertTitle>Correct</AlertTitle>
                                <AlertDescription>
                                  You have answered the question correctly.
                                </AlertDescription>
                              </Alert>
                            )
                              :
                              (
                                <Alert variant="destructive" className="mt-2 w-[60%] text-red-600 border-red-600">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertTitle>Incorrect</AlertTitle>
                                  <AlertDescription>
                                    <p>You have answered the question incorrectly. </p>
                                    <p>Answer : {selectedQuestion?.answer}</p>
                                  </AlertDescription>
                                </Alert>
                              )
                            : ""
                        }

                        {
                          AnswerResponse ? (
                            <Button className="mt-4" onClick={nextQuestion}>Next Question</Button>
                          ) : (
                            <Button className="mt-4" onClick={checkAnswer}>Submit Answer</Button>
                          )
                        }
                      </section>

                    </>


                  )

                    : (

                      <section className="flex flex-col items-center w-[80%]">
                        <h2> Done, nice work!</h2>
                        <Confetti />
                      </section>
                    )

                }

              </div>
            </>
          ) :
            <>
              <h1 className="text-2xl font-bold">No questions found</h1>
            </>
        }

      </main>
    </div >
  )
}

export default Quizzes
