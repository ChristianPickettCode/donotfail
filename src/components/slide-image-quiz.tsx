"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { GenerateQuizFromSlideImage, GetQuizQuestionsForSlideImage } from "@/app/action";
import Loader from "./ui/loader";

type Props = {
  slideId: string
  slideImageId: string
}

export function SlideImageQuiz(props: Props) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const [loading, setLoading] = useState(false);

  const toggleKeepQuestion = (id: any) => {
    setQuestions(questions.map((question) => (question.id === id ? { ...question, keep: !question.keep } : question)))
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const generateQuestions = () => {
    setLoading(true);
    GenerateQuizFromSlideImage(props.slideId, props.slideImageId)
      .then((res) => {
        console.log(res)
        if (res.data) {
          const mapped = res.data.map((item: any) => {
            return {
              id: item.id,
              title: item.question,
              answer: item.answer,
              keep: false,
            }
          })
          setQuestions((prev) => {
            const existingIds = new Set(prev.map((item: any) => item.id));
            const uniqueNewItems = mapped.filter((item: any) => !existingIds.has(item.id));
            return [...prev, ...uniqueNewItems];
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    GetQuizQuestionsForSlideImage(props.slideId, props.slideImageId)
      .then((res) => {
        console.log(res)
        if (res.data) {
          const mapped = res.data.map((item: any) => {
            return {
              id: item.id,
              title: item.question,
              answer: item.answer,
              keep: false,
            }
          })
          setQuestions((prev) => {
            const existingIds = new Set(prev.map((item: any) => item.id));
            const uniqueNewItems = mapped.filter((item: any) => !existingIds.has(item.id));
            return [...prev, ...uniqueNewItems];
          });
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.slideId, props.slideImageId])

  return (
    <div className="container mx-auto px-0 py-0">
      {/* <h1 className="text-3xl font-bold mb-4 px-2">Quiz Questions</h1> */}
      {/* Generate */}
      {
        questions.length === 0 ? (
          <Button onClick={generateQuestions} className="mb-4 ml-2" disabled={loading}>
            Generate quiz questions
          </Button>
        )
          :
          <>
            <ul className="space-y-2 overflow-y-auto px-2 pb-4">
              {currentItems.map((question) => (

                <Accordion key={question.id} type="single" collapsible>
                  <AccordionItem value={`item-${question.id}`}>
                    <AccordionTrigger className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold text-left mr-2">{question.title}</h2>
                    </AccordionTrigger>
                    <AccordionContent className="py-4 pl-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-base font-semibold">{question.answer}</div>
                        </div>
                        {/* <div className="flex space-x-4">
                          <Button variant={question.keep ? "default" : "outline"} onClick={() => toggleKeepQuestion(question.id)} className="w-20">
                            {question.keep ? "Keep" : "Remove"}
                          </Button>
                        </div> */}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </ul>
            <div className="flex justify-between mt-0">
              <Button onClick={generateQuestions} className="mb-4 ml-2" disabled={loading}>
                Generate more
              </Button>
              <div className="flex gap-2 mr-2">
                <Button onClick={goToPrevPage} disabled={currentPage === 1} className="w-20">Prev</Button>
                <Button onClick={goToNextPage} disabled={currentPage === totalPages} className="w-20">Next</Button>
              </div>
            </div>
          </>
      }
    </div>
  )
}
