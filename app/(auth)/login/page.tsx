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
// import Image from "next/image"

export default function LoginPage() {
    return (
        <div className="flex justify-center py-16 border-b">
            <Card className="w-full max-w-sm">
                {/* <Image src='/witcher.webp' alt='logo' width={40} height={40} /> */}
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
