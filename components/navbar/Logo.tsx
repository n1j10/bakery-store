import Link from 'next/link'
import { Wheat } from 'lucide-react'
import { links } from '@/utils/links'

function Logo() {
  return (
    <Link href={links.HOME.href} className='flex items-center gap-2.5 shrink-0' aria-label='مخبز السنابل - الرئيسية'>
      <span className='grid size-10 place-items-center rounded-2xl bg-honey text-honey-foreground shadow-sm rotate-3'>
        <Wheat className='size-5' />
      </span>
      <span className='leading-tight'>
        <span className='block font-heading text-xl font-bold'>مخبز السنابل</span>
        <span className='hidden sm:block text-[11px] text-muted-foreground'>حلويات · معجنات · خبز</span>
      </span>
    </Link>
  )
}

export default Logo
