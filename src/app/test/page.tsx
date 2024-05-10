import { Gallery } from '@/components/gallery'
import { Sidebar2 } from '@/components/sidebar2'
import React from 'react'

type Props = {}

function Page({ }: Props) {
    return (
        <div className='flex'>
            <Sidebar2>
                <Gallery />
            </Sidebar2>
            {/* <Gallery /> */}
        </div>
    )
}

export default Page