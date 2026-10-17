import { Skeleton } from '../ui/skeleton'

export function LoadingContainer() {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
    </div>
  )
}

export function LoadingHero() {
  return (
    <div className='grid gap-6'>
      <LoadingProduct />
    </div>
  )
}

export function LoadingProduct() {
  return (
    <div>
      <Skeleton className='aspect-square w-full rounded-[2rem]' />
      <Skeleton className='h-5 w-3/4 mt-4' />
      <Skeleton className='h-4 w-1/2 mt-3' />
    </div>
  )
}
