import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { links } from '@/utils/links'
import { cn } from '@/lib/utils'
import { fetchCartItems } from '@/utils/api'

async function CartButton() {
  const cartItems = await fetchCartItems();

  return (
    <Link
      href={links.CART.href}
      aria-label={`السلة (${cartItems})`}
      className={cn(buttonVariants({ variant: 'outline', size: 'icon-lg' }), 'relative rounded-full')}
    >
      <ShoppingBag className='size-[18px]' />
      {cartItems > 0 && (
        <span className='absolute -top-1.5 -end-1.5 grid min-w-5 h-5 place-items-center rounded-full bg-honey px-1 text-[11px] font-bold text-honey-foreground'>
          {cartItems}
        </span>
      )}
    </Link>
  )
}

export default CartButton
