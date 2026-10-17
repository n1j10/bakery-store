import { Suspense } from 'react'
import Link from 'next/link'
import Container from '../global/Container'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CartButton from './CartButton'
import LinksDropdown from './LinksDropdown'
import DarkMode from './DarkMode'
import { getCurrentUser } from '@/utils/api'
import { headerLinks } from '@/utils/links'

async function Navbar() {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <header className='sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md'>
      {/* announcement strip */}
      <div className='bg-primary text-primary-foreground text-center text-xs sm:text-sm py-1.5 px-4'>
        🥐 مخبوزاتنا تطلع من الفرن كل يوم الساعة 7 الصبح — توصيل مجاني لكل الطلبات
      </div>

      <Container className='py-3'>
        <div className='flex items-center gap-3 sm:gap-6'>
          <Logo />

          <nav className='hidden lg:flex items-center gap-1'>
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className='hidden md:block flex-1 max-w-sm ms-auto'>
            <Suspense>
              <NavSearch />
            </Suspense>
          </div>

          <div className='flex items-center gap-2 ms-auto md:ms-0'>
            <DarkMode />
            <CartButton />
            <LinksDropdown isSignedIn={!!user} isAdmin={isAdmin} imageUrl={user?.imageUrl} userName={user?.name} />
          </div>
        </div>

        <div className='md:hidden mt-3'>
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>
      </Container>
    </header>
  )
}

export default Navbar
