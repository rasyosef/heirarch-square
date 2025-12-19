import { Skeleton } from "@/components/ui/skeleton"

export function CardListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 pb-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 rounded-md shadow-none border bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col gap-4 rounded-xl">
        <Skeleton className="aspect-17/11 w-full bg-white dark:bg-gray-900 rounded-xl" />
        <div className="p-2">
          <Skeleton className="h-18 bg-gray-200 dark:bg-gray-900 rounded-xl " />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 px-2 pb-2">
        <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-900 rounded-xl" />
        <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-900 rounded-xl" />
      </div>
    </div>
  )
}

export function SearchResultsListSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-4 w-full lg:w-4/5">
      <SearchResultSkeleton />
      <SearchResultSkeleton />
      <SearchResultSkeleton />
    </div>
  )
}

function SearchResultSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row p-0 gap-0 rounded-md shadow-none border ">
      <div className="w-full sm:w-3/10 p-4 px-6 bg-gray-100 dark:bg-gray-900">
        <Skeleton className="aspect-17/10 bg-white dark:bg-gray-800" />
      </div>
      <div className="w-full sm:w-7/10 bg-gray-50 dark:bg-gray-800 flex flex-col justify-between gap-4 p-4 py-6">
        <div className="px-2">
          <Skeleton className="h-18 bg-gray-200 dark:bg-gray-900" />
        </div>

        <div className="flex flex-row justify-between px-2 gap-3">
          <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-900" />
          <Skeleton className="h-10 w-32 bg-gray-200 dark:bg-gray-900" />
        </div>
      </div>
    </div>
  )
}
