import Image from 'next/image'
import { Wheat } from 'lucide-react'

// Shared two-column frame for the sign-in and sign-up pages
function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className='mx-auto grid max-w-5xl overflow-hidden rounded-[2.5rem] bg-card ring-1 ring-foreground/5 lg:grid-cols-2'>
      <div className='p-8 sm:p-12'>
        <span className='grid size-12 place-items-center rounded-2xl bg-honey text-honey-foreground rotate-3'>
          <Wheat className='size-6' />
        </span>
        <h1 className='mt-6 text-3xl font-bold'>{title}</h1>
        <p className='mt-2 mb-8 text-muted-foreground'>{subtitle}</p>
        {children}
      </div>
      <div className='relative hidden min-h-[520px] lg:block'>
        <Image src='/hero-bakery.jpg' alt='' fill sizes='50vw' className='object-cover' />
        <div className='absolute inset-0 bg-linear-to-t from-primary/70 to-transparent' />
        <p className='absolute bottom-10 inset-x-10 font-heading text-2xl font-bold leading-relaxed text-white'>
          «ريحة الخبز الحار الصبح… أحلى بداية لأي يوم»
        </p>
      </div>
    </section>
  )
}

export default AuthShell
