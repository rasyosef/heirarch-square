import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import LoginForm from "@/components/LoginForm"
import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"

export default function LoginPage() {
    return (
        <div className="flex justify-center px-4 py-16">
            <Card className="w-full max-w-sm">
                <div className="flex flex-col items-center">
                    <Link href='/'>
                        <Image src='/witcher.webp' alt='logo' width={80} height={80} />
                    </Link>
                </div>
                <CardHeader>
                    <CardTitle>Log in to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to log in to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}
