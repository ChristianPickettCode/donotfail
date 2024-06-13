"use client"
import Quizzes from '@/components/quizzes'
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
        // <Quizzes slideId={props.params.slide_id} />
        <Sidebar3>
            <QuizzesPage slideId={props.params.slide_id} />
        </Sidebar3>
    )
}

export default Page