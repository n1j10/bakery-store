import Link from 'next/link'
import { Clock, MapPin, Phone, Wheat } from 'lucide-react'
import Container from './Container'
import { headerLinks } from '@/utils/links'

function Footer() {
  return (
    <footer className='mt-20 bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground'>
      <Container className='py-12'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-2.5'>
              <span className='grid size-10 place-items-center rounded-2xl bg-honey text-honey-foreground rotate-3'>
                <Wheat className='size-5' />
              </span>
              <span className='font-heading text-xl font-bold'>مخبز السنابل</span>
            </div>
            <p className='mt-4 max-w-sm leading-7 opacity-80'>
              مخبز عائلي من 15 سنة، نخبز الحلويات الشرقية والكيك والمعجنات والخبز كل يوم بمكونات طبيعية.
            </p>
          </div>

          <div>
            <h3 className='mb-4 font-bold'>روابط</h3>
            <ul className='space-y-2 opacity-80'>
              {headerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className='hover:underline underline-offset-4'>{link.label}</Link>
                </li>
              ))}
              <li><Link href='/cart' className='hover:underline underline-offset-4'>السلة</Link></li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-bold'>تواصل معنا</h3>
            <ul className='space-y-3 opacity-80'>
              <li className='flex items-center gap-2'><MapPin className='size-4 shrink-0' /> بغداد، الكرادة، شارع 62</li>
              <li className='flex items-center gap-2'><Phone className='size-4 shrink-0' /> <span dir='ltr'>0770 000 0000</span></li>
              <li className='flex items-center gap-2'><Clock className='size-4 shrink-0' /> يومياً 7 ص — 11 م</li>
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-current/15 pt-6 text-center text-sm opacity-70'>
          © {new Date().getFullYear()} مخبز السنابل. جميع الحقوق محفوظة.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
