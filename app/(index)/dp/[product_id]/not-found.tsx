import { Button } from '@/components/ui/button';
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-16">
      <FrownIcon className="w-10 text-gray-400" />
      <div className='flex flex-col gap-2 items-center pb-4'>
        <h2 className="text-xl font-medium">404 Not Found</h2>
        <p>Could not find the requested product.</p>
      </div>
      <Button size='sm' className='rounded-full' asChild>
        <Link href="/">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}