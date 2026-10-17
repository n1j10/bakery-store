import { Product } from '@/utils/type'
import Link from 'next/link'
import Image from 'next/image';
import { Flame } from 'lucide-react';
import { links } from '@/utils/links'
import { formatCurrency } from '@/utils/format';
import FavoriteToggleButton from './FavoriteToggleButton';
import SubmitButton from '../form/Buttons';
import FormContainer from '../form/FormContainer';
import { createOrderAction } from '@/utils/api';

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <section className='grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map((product) => {
        const { id, name, description, image, price, featured, category } = product;
        const href = `${links.PRODUCTS.href}/${id}`;

        return (
          <article key={id} className='group flex flex-col'>
            <div className='relative aspect-square overflow-hidden rounded-[2rem] bg-muted'>
              <Link href={href} aria-label={name} className='absolute inset-0'>
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw'
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
              </Link>

              <div className='absolute top-3 end-3 rounded-full bg-background/90 backdrop-blur shadow-sm'>
                <FavoriteToggleButton productId={id} />
              </div>

              {featured && (
                <span className='absolute top-3 start-3 inline-flex items-center gap-1 rounded-full bg-honey px-3 py-1 text-xs font-bold text-honey-foreground'>
                  <Flame className='size-3.5' /> الأكثر طلباً
                </span>
              )}
            </div>

            <div className='mt-4 flex flex-1 flex-col px-1'>
              {category?.title && <p className='text-xs font-medium text-primary'>{category.title}</p>}
              <h3 className='mt-1 text-lg font-bold leading-snug'>
                <Link href={href} className='hover:text-primary transition-colors'>{name}</Link>
              </h3>
              <p className='mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground'>{description}</p>

              <div className='mt-auto flex items-center justify-between gap-3 pt-4'>
                <p className='font-heading text-lg font-bold'>{formatCurrency(price)}</p>
                <FormContainer action={createOrderAction}>
                  <input type="hidden" name="productId" value={id} />
                  <SubmitButton text='شراء' size='default' className='mt-0 h-9 rounded-full px-5' />
                </FormContainer>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  )
}

export default ProductsGrid
