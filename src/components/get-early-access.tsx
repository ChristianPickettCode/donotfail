'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { useRouter } from "next/navigation"
import { VerifyAccessCode } from '@/app/action'


export function GetEarlyAccess() {
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { push } = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsSubmitted(true);

    const code = event.target[0].value;
    const data = {
      code,
    }

    VerifyAccessCode(data)
      .then((response) => {
        console.log(response);
        if (!response.error) {
          setIsValid(true);
          // wait 2 seconds before redirecting
          setTimeout(() => {
            saveToLocalStorage(code)
            push("/dashboard");
          }, 2000)
        } else {
          setIsValid(false);
        }
      })
      .catch((error) => {
        setIsValid(false);
      });
  };

  const saveToLocalStorage = (code: string) => {
    // e.preventDefault()
    localStorage.setItem("accessCode", code)
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Get Early Access</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Enter your access code or sign up for the waitlist before anyone else.
        </p>
      </div>
      <div className="max-w-md w-full mt-8">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <Input type="text" placeholder="Enter access code" className="w-full" />
          <Button type="submit" className="w-full">
            Get Access
          </Button>

        </form>
        {isSubmitted && !isValid && (
          <Alert variant="destructive" className='my-2'>
            <AlertCircle className="h-4 w-4" />
            {/* <AlertTitle>Error</AlertTitle> */}
            <AlertDescription>
              Access code is invalid. Please try again.
            </AlertDescription>
          </Alert>)
        }
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {"Don't have an access code?"}
          <Link href="https://tally.so/r/nWoDXQ" className="underline" prefetch={false}>
            Join the waitlist
          </Link>
        </p>
      </div>
    </section>
  )
}
