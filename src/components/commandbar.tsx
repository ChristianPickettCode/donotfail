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

type Props = {}

const CommandBar = (props: Props) => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState("")
    const [open, setOpen] = useState(false)

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
        console.log("askQuestion")
        Search({ question, context: "" })
            .then((res) => {
                console.log(res);
                let response = res.choices[0].message.content
                console.log(response)
                setAnswer(response)
                setLoading(false)
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