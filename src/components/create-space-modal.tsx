"use client"
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { AddSpaceToUser, CreateSpace } from "@/app/action"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string(),
})

type Props = {
    userId: string
}
export function CreateSpaceModal(props: Props) {

    const [open, setOpen] = useState(false)
    const { push } = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    const handleCreateSpace = async () => {
        console.log('creating space')
        const data = {
            name: form.getValues().name,
        }
        try {
            CreateSpace(data)
                .then((res_c) => {
                    console.log(res_c)
                    AddSpaceToUser({ user_id: props.userId, space_id: res_c.InsertedID })
                        .then((res) => {
                            setOpen(false)
                            console.log(res)
                            push('/dashboard')
                            push(`/spaces/${res_c.InsertedID}`)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Space</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Space</DialogTitle>
                    {/* <DialogDescription>Choose a file to upload and give it a name.</DialogDescription> */}
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md w-full flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <Button type="submit" className="w-full mt-2" onClick={handleCreateSpace}>
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
