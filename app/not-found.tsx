import { Button } from '@/components/ui/button';
import { FrownIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <FrownIcon size={40} className="text-gray-500" />
      <div className='flex flex-col gap-2 items-center pb-4'>
        <h2 className="text-xl font-medium">404 Not Found</h2>
        <p>Could not find the requested page.</p>
      </div>
      <Button size='lg' className='rounded-full' asChild>
        <Link href="/">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}