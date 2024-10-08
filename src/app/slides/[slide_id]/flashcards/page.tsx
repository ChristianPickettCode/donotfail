"use client"
import { FlashcardsPage } from '@/components/flashcards-page'
import { QuizzesPage } from '@/components/quizzes-page'
import { Sidebar3 } from '@/components/sidebar3'
import React from 'react'

type Props = {
    params: {
        slide_id: string;
    }
}

const Page = (props: Props) => {
    return (
        <Sidebar3>
            <FlashcardsPage />
            {/* <QuizzesPage /> */}
        </Sidebar3>
    )
}

export default Page