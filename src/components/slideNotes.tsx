"use client"
import React, { useEffect, useState } from 'react'
import { GenerateNotes } from "@/app/action"
import MarkdownWithLatex from '@/app/MarkdownWithLatex'

type Props = {
    params: any
}

function SlideNotes(props: Props) {
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        GenerateNotes(props.params.slide_id)
            .then((res) => {
                console.log(res.data[0]);
                setNotes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.params.slide_id]);

    return (
        <main className="container mx-auto px-4 py-8 md:py-6 lg:py-6">
            hello world
            {notes.map((note: any, index: number) => (
                <div className="py-4" key={`note-${index}`}>
                    {/* <h1 className="text-2xl font-bold">{note.title}</h1>
                    <p className="text-lg">{note.content}</p> */}

                    Slide {index + 1}
                    <MarkdownWithLatex markdownText={note} streaming={false} />
                </div>
            ))}
        </main>
    );
}

export default SlideNotes
