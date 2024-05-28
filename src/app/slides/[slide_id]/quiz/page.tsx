"use client"
import Quizzes from '@/components/quizzes'
import React from 'react'

type Props = {
    params: {
        slide_id: string;
    }
}

const Page = (props: Props) => {
    return (
        <Quizzes slideId={props.params.slide_id} />
    )
}

export default Page