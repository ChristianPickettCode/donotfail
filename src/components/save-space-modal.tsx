"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { AddSpaceToUser } from '@/app/action'
import { useAuth } from '@clerk/nextjs'


type Props = {
    spaceId: string
    userId: string
}

export function SaveSpaceModal(props: Props) {


    const handleSave = () => {
        if (!props.userId) return
        AddSpaceToUser({ user_id: props.userId, space_id: props.spaceId })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" className='mr-2'>Save</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Save This Space?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Would you like to save this space to your dashboard for easy access in the future?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}