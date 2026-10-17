import Link from 'next/link'
import Image from 'next/image'
import { fetchAllCategories } from '@/utils/api'
import { links } from '@/utils/links'
import SectionTitle from '../global/SectionTitle'

async function Categories() {
  const categories = await fetchAllCategories();
  if (categories.length === 0) return null;

  return (
    <section id='categories' className='scroll-mt-32'>
      <SectionTitle eyebrow='الأقسام' text='شنو تشتهي اليوم؟' />

      <div className='grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6'>
        {categories.map(({ id, title, image }) => (
          <Link key={id} href={`${links.PRODUCTS.href}?category=${id}`} className='group flex flex-col items-center text-center'>
            <div className='relative size-24 overflow-hidden rounded-full ring-4 ring-secondary transition-all duration-300 group-hover:ring-honey group-hover:-translate-y-1 sm:size-32'>
              <Image
                src={image}
                alt={title}
                fill
                sizes='128px'
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
            </div>
            <h3 className='mt-3 text-sm font-medium sm:text-base'>{title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories
