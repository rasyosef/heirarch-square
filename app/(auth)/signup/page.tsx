import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignupForm from "@/components/forms/SignupForm"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SignupPage() {
  const session = await auth();

  // redirect logged in users to the homepage
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex justify-center px-4 py-16">
      <Card className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <Link href='/'>
            <Image src='/witcher.webp' alt='logo' width={80} height={80} />
          </Link>
        </div>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}
