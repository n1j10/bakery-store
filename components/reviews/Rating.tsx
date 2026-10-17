import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

function Rating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5' aria-label={`${rating} من 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn('size-4', index < rating ? 'fill-honey text-honey' : 'text-muted-foreground/40')}
        />
      ))}
    </div>
  )
}

export default Rating
