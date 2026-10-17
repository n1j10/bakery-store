import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

type EmptyListProps = {
  title: string,
  description?: string,
  // Shows a "browse products" button when true
  withLink?: boolean,
  className?: string
}

function EmptyList({ title, description, withLink = false, className }: EmptyListProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-16 text-center', className)}>
      <span className='grid size-16 place-items-center rounded-full bg-secondary text-primary'>
        <Cookie className='size-8' />
      </span>
      <h2 className='mt-5 text-xl font-bold'>{title}</h2>
      {description && <p className='mt-2 max-w-sm text-muted-foreground'>{description}</p>}
      {withLink && (
        <Link href='/products' className={cn(buttonVariants(), 'mt-6 h-10 rounded-full px-6')}>
          تصفح المنتجات
        </Link>
      )}
    </div>
  )
}

export default EmptyList
