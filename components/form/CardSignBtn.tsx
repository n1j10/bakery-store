import Link from 'next/link'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

// Visitor clicked the heart -> send them to sign in first
function CardSignBtn() {
  return (
    <Link
      href='/sign-in'
      aria-label='سجّل دخولك لإضافة المنتج للمفضلة'
      className={cn(buttonVariants({ variant: 'ghost', size: 'icon-lg' }), 'rounded-full text-rose-500 hover:text-rose-600')}
    >
      <Heart className='size-[18px]' />
    </Link>
  )
}

export default CardSignBtn
