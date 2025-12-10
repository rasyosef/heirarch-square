'use client';

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from 'react';
import { authenticateUser } from '@/lib/actions/user';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticateUser,
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
            <Link
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
          />
        </div>
        <Input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button type="submit" className="w-full" aria-disabled={isPending}>
          Log In
        </Button>
        {errorMessage && (
          <p className="text-sm text-red-500 inline-flex items-center gap-2">
            <AlertCircleIcon size="1.25em" /> {errorMessage}
          </p>
        )}
      </div>
    </form>
  )
}