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
    <div className="flex flex-col justify-between gap-4 p-4 rounded-md shadow-none border bg-gray-100">
      <div className="flex flex-col gap-4 rounded-xl">
        <div className="aspect-17/11 w-full bg-white rounded-xl" />
        <div className="p-2">
          <div className="h-18 bg-gray-200 rounded-xl " />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-4 px-2 pb-2">
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}

{/* <div className="flex flex-col gap-4"> */ }

{/* <div className="h-16 bg-gray-200 rounded-xl" /> */ }
{/* </div> */ }

{/* <div className="flex flex-row justify-between gap-4 pt-4">
        <div className='flex flex-col rounded-xl w-16 border bg-gray-200'>
          <span className='text-sm font-medium uppercase h-6' />
          <span className='text-xl font-semibold h-6' />
        </div>
        <div className="h-12 w-32 border rounded-full bg-gray-200" />
      </div> */}