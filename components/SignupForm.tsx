'use client';

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState } from 'react';
import { createUser } from '@/lib/actions';
import { Button } from "./ui/button";

export default function SignupForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        createUser,
        undefined,
    );

    return (
        <form action={formAction}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password" className="text-sm">Password</Label>
                    </div>
                    <Input id="password" type="password" name="password" required />
                </div>
                {/* <Input type="hidden" name="redirectTo" value='/' /> */}
                <Button type="submit" className="w-full" aria-disabled={isPending}>
                    Sign Up
                </Button>
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
        </form>
    )
}