import { FrownIcon } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 py-16">
            <FrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-medium">404 Not Found</h2>
            <p>Could not find the requested product.</p>
        </div>
    );
}