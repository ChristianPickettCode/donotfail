import { CreateUser } from "@/app/action"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Props = {
    open: boolean
    email: string
    userId: string
}

const OnboardingModal = (props: Props) => {
    const [open, setOpen] = useState(props.open)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [school, setSchool] = useState("")


    const handleSubmit = () => {
        const data = {
            user_id: props.userId,
            first_name: firstName,
            last_name: lastName,
            email: props.email,
            school,
        }
        console.log(data)
        setOpen(false)
        CreateUser(data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome!</DialogTitle>
                    <DialogDescription>
                        {"Let's get started by setting up your profile. Please fill in the information below."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Your Name"
                            className="col-span-3"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Your Name"
                            className="col-span-3"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="col-span-3"
                            // onChange={(e) => setEmail(e.target.value)}
                            value={props.email}
                            disabled
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="school" className="text-right">
                            School
                        </Label>
                        <Input
                            id="school"
                            placeholder="Your School"
                            className="col-span-3"
                            onChange={(e) => setSchool(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Complete Setup</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OnboardingModal