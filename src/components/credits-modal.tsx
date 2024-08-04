"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { StarsIcon } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { GetUserCredits } from '@/app/action'
import { toast } from './ui/use-toast'
import Link from 'next/link'

type Props = {}

const CreditsModal = (props: Props) => {

    const { userId } = useAuth()
    const [credits, setCredits] = useState(0)

    const GetCredits = async () => {
        if (!userId) return;
        try {
            const res = await GetUserCredits(userId!)
            console.log(res)
            if (res.error) {
                if (res.error != 'mongo: no documents in result') {
                    toast({
                        title: `${res.error}`,
                        // description: `${res.error}`,
                        duration: 5000
                    });
                }

                return;
            }
            setCredits(res.credits)
        } catch (err) {
            console.log(err)
            return;
        }
    }

    useEffect(() => {
        // Get credits
        GetCredits()

    }, [])

    return (
        <Dialog onOpenChange={() => GetCredits()}>
            <DialogTrigger asChild>
                <StarsIcon className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Credits</DialogTitle>
                    <DialogDescription>
                        <p className='mt-2 mb-2'>You have <b>{credits}</b> credits</p>
                        <Link href="https://tally.so/r/w52PoM" className='underline'>
                            Request more credits
                        </Link>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreditsModal