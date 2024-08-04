"use client"
import { Sidebar3 } from '@/components/sidebar3'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth, useClerk } from '@clerk/nextjs'
import { GetUser, GetUserCredits } from '../action'
import { toast } from '@/components/ui/use-toast'

type Props = {}

const Page = (props: Props) => {
    const { signOut } = useClerk();
    const { userId } = useAuth()

    const [user, setUser] = useState<any>(null)
    const [credits, setCredits] = useState(0)

    const GetCredits = async () => {
        try {
            const res = await GetUserCredits(userId!)
            console.log(res)
            if (res.error) {
                if (res.error != "mongo: no documents in result") {
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
        if (!userId) {
            return
        }
        GetUser(userId)
            .then((res) => {
                console.log(res)
                setUser(res)
                GetCredits()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [userId])

    return (
        <Sidebar3>
            <div className="grid gap-6 mx-4 my-4 z-0">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Manage your account details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input id="first_name" value={user?.first_name} disabled />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input id="last_name" value={user?.last_name} disabled />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="school">School</Label>
                                <Input id="school" value={user?.school} disabled />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={user?.email} disabled />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t p-6">
                        <Button onClick={() => signOut()}>Sign out</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Subscription Status</CardTitle>
                        <CardDescription>View and manage your subscription details.</CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="grid gap-4">
                            {/* <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Pro Plan</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Expires on 2024-06-30</div>
                                </div>
                                <Button variant="outline">Manage Subscription</Button>
                            </div> */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Remaining Credits</div>


                                    <div className="text-sm text-gray-500 dark:text-gray-400">You have {credits} credits remaining</div>

                                </div>
                                {/* <Button variant="outline" disabled={true}>Top Up Credits</Button> */}
                                <Link href="https://tally.so/r/w52PoM">
                                    <Button variant="outline" className='mt-6 '>Request more credits</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Sidebar3>
    )
}

export default Page