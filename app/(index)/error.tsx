'use client';

import { FrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error(
  { reset }: {
    reset: () => void;
  }
) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen items-center justify-center gap-8 py-16">
          <div className="flex flex-col items-center gap-4">
            <FrownIcon size={40} className="text-gray-500" />
            <h2 className="text-xl font-medium">Something went wrong! </h2>
          </div>
          <Button className="rounded-full" onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}