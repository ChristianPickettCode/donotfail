"use client"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ConfettiExplosion from 'react-confetti-explosion';
import { useState } from "react";

export function Quizzes() {
  const [isExploding, setIsExploding] = useState(false);
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <aside className="w-full md:w-1/5 bg-gray-100 p-4 overflow-y-auto">
        <nav>
          <ul className="flex flex-wrap">
            {
              Array.from({ length: 100 }).map((_, index) => (
                <li key={index}>
                  <a href="#" className="">
                    <div className="m-1 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </a>
                </li>
              ))
            }
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 flex flex-col">
        <header className="mb-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold">Natural Language Processing</h1>
          <Select>
            <SelectTrigger aria-label="Select language" id="language" className="w-32 mt-4 md:mt-0">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="tagalog">Tagalog</SelectItem>
            </SelectContent>
          </Select>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <section className="flex flex-col items-center w-[80%]">
            <h2 className="text-xl font-semibold mb-2">Question #1</h2>
            <p className="text-lg mb-4">What is a transformer?</p>
            <Input className="mb-4" placeholder="Type your answer here" />
            <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={() => setIsExploding(true)}>Check Answer</Button>
            <>{isExploding && <ConfettiExplosion />}</>
          </section>
        </div>
      </main>
    </div>
  )
}
