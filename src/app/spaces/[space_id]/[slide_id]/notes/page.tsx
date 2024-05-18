import React from 'react'
import { Sidebar2 } from "@/components/sidebar2";
import SlideNotes from '@/components/slideNotes';

type Props = {
    params: any
}

const Page = (props: Props) => {

    return (
        <Sidebar2>
            {/* <Gallery /> */}
            <SlideNotes params={props?.params} />
        </Sidebar2>
    )
}

export default Page