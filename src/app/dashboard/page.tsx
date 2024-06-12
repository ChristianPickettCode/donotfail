"use client"
import Spaces from "@/components/spaces";
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useClerk } from '@clerk/nextjs';
import { Sidebar3 } from "@/components/sidebar3";
import { Archive, ArchiveX, MessagesSquare, Users2 } from "lucide-react";
import OnboardingModal from "@/components/onboarding-modal";
import { GetUser } from "../action";

export default function Page() {
    const { push } = useRouter()
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { user } = useClerk();
    const { signOut } = useClerk();

    const [email, setEmail] = useState<string>("")
    const [onboarding, setOnboarding] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<any>(null)

    useEffect(() => {
        if (!isLoaded) return;
        if (!userId) {
            push('/sign-in')
        } else {
            const e = user?.primaryEmailAddress?.emailAddress
            console.log(e, userId)
            if (e) {
                setEmail(e)
                GetUser(userId)
                    .then((res) => {
                        console.log(res)
                        if (res.error) {
                            setOnboarding(true)
                        } else {
                            setUserDetails(res.data)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

        }

    }, [isLoaded, userId, user])

    return (
        <Sidebar3>
            <Spaces filter="user" />
            {
                onboarding && email != "" && userId ? <OnboardingModal open={true} email={email} userId={userId} /> : null
            }
        </Sidebar3>

    );
}
