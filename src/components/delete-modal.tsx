"use client"
import React from 'react'

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
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { DeleteSlide } from '@/app/action'
import { Input } from './ui/input'

type Props = {
    slideId: string
}

const DeleteModal = (props: Props) => {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));
    const [isOpen, setIsOpen] = React.useState(false)
    const { push } = useRouter()
    const [deleteText, setDeleteText] = React.useState("")

    const handleDelete = () => {
        console.log("deleting")
        if (deleteText !== "DELETE") {
            return
        }
        DeleteSlide(props.slideId)
            .then((res) => {
                console.log(res)
                if (res.status_code === 200) {
                    console.log("deleted")
                    push("/gallery")
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <>
            <Button variant="destructive" onClick={() => setIsOpen(true)}>Delete</Button>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action <b>cannot</b> be undone. This will <b>permanently delete</b> these slides and remove the data from our servers.
                        </AlertDialogDescription>
                        <Input placeholder="Type DELETE to confirm" onChange={(e) => setDeleteText(e.target.value)} />

                        <div className='flex justify-end'>
                            <Button variant="outline" className='mr-2' onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button className='bg-[hsl(var(--destructive))] hover:bg-red-600' onClick={handleDelete}>Delete</Button>
                        </div>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteModal