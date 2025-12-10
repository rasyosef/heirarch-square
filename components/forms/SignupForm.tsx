'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from 'react';
import { createUser } from '@/lib/actions/user';
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";

export default function SignupForm() {
  const [formState, formAction, isPending] = useActionState(
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
          {formState?.errors?.email && (
            <p className="text-red-500 text-sm">
              {formState?.errors.email[0]}
            </p>
          )}

        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-sm">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
          />
          {formState?.errors?.password && (
            <p className="text-red-500 text-sm">
              {formState?.errors.password[0]}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" aria-disabled={isPending}>
          Sign Up
        </Button>
        {formState && (
          <p className="text-sm text-red-500 inline-flex items-center gap-2">
            <AlertCircleIcon size="1.25em" /> {formState.message}
          </p>
        )}
      </div>
    </form>
  )
}