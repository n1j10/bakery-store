import Image from 'next/image';
import Link from 'next/link';
import { HeartHandshake, Leaf, Wheat } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const values = [
  { icon: Wheat, title: 'وصفات العائلة', text: 'الكليجة والزلابية بنفس طريقة جدتنا من الثمانينات.' },
  { icon: Leaf, title: 'بدون مواد حافظة', text: 'نخبز كميات يومية حتى ما نحتاج أي مواد حافظة.' },
  { icon: HeartHandshake, title: 'زبائننا عائلتنا', text: 'أغلب زبائننا وياانا من أول يوم فتحنا بيه.' },
];

function AboutPage() {
  return (
    <div className='space-y-20'>
      <section className='grid items-center gap-10 lg:grid-cols-2'>
        <div>
          <p className='text-sm font-medium text-primary'>قصتنا</p>
          <h1 className='mt-3 text-4xl font-bold leading-[1.4] sm:text-5xl'>
            من فرن صغير بالكرادة
            <br />
            <span className='text-primary'>لكل بيت ببغداد</span>
          </h1>
          <p className='mt-6 text-lg leading-9 text-muted-foreground'>
            بدأ مخبز السنابل سنة 2010 بفرن واحد وصينية بقلاوة. اليوم نخبز أكثر من 40 صنف كل يوم،
            من الكيك والمعجنات للحلويات الشرقية والخبز الحار، وبقينا محافظين على نفس الطعم ونفس الحب.
          </p>
          <Link href='/products' className={cn(buttonVariants({ size: 'lg' }), 'mt-8 h-12 rounded-full px-8 text-base')}>
            شوف منتجاتنا
          </Link>
        </div>
        <div className='relative aspect-4/3 overflow-hidden rounded-[2.5rem] shadow-xl'>
          <Image src='/hero-pastries.jpg' alt='معجنات طازجة من مخبز السنابل' fill sizes='(max-width:1024px) 100vw, 50vw' className='object-cover' />
        </div>
      </section>

      <section className='grid gap-6 sm:grid-cols-3'>
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className='rounded-[2rem] bg-secondary/60 p-8'>
            <span className='grid size-12 place-items-center rounded-2xl bg-background text-primary'>
              <Icon className='size-6' />
            </span>
            <h2 className='mt-5 text-xl font-bold'>{title}</h2>
            <p className='mt-2 leading-7 text-muted-foreground'>{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AboutPage;
