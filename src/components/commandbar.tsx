"use client"
import React, { useEffect, useState } from 'react'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Search } from "@/app/action";
import Markdown from 'react-markdown';
import { Button } from './ui/button';
import { CommandIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from './ui/loader';

type Props = {}

const CommandBar = (props: Props) => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState("")
    const [open, setOpen] = useState(false)

    const { push } = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const askQuestion = (question: string) => {
        console.log("askQuestion", question)
        Search({ question, context: "" })
            .then((res) => {
                console.log(res);
                if (res.choices[0].finish_reason === "tool_calls") {
                    const tools = res.choices[0].message.tool_calls
                    for (const tool of tools) {
                        console.log(tool)
                        const func = tool.function.name
                        const arg = JSON.parse(tool.function.arguments)
                        console.log(func, arg)
                        if (func == "move-to-slide") {
                            setOpen(false)
                            setLoading(false)
                            console.log("Moving to slide", arg.slideNumber)

                            const slideElement = document.getElementById(`s${arg.slideNumber}`);
                            if (slideElement) {
                                slideElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the corresponding slide element
                                push(`#${slideElement.id}`); // Add slide ID to the URL
                            }


                        }
                    }

                } else {
                    let response = res.choices[0].message.content
                    console.log(response)
                    setAnswer(response)
                    setLoading(false)
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Ask anything..." onValueChange={setSearch}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && loading === false) {
                            e.preventDefault()
                            console.log('Searching')
                            setLoading(true)
                            askQuestion(search)
                        }
                    }}
                />
                <CommandList>
                    <CommandEmpty className="px-4 text-left py-2">
                        {/* {
                            loading && <Loader className='h-4' />
                        } */}
                        <Markdown>{answer}</Markdown>
                    </CommandEmpty>
                    <CommandGroup heading="Previous Response">
                        <CommandItem>
                            <span>
                                {answer}
                            </span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>
            </CommandDialog>
            <div className="fixed top-2 right-4">
                <Button variant="outline" onClick={() => setOpen((open) => !open)}><CommandIcon size={16} />CMD-K</Button>
            </div>
        </>
    )
}

export default CommandBar