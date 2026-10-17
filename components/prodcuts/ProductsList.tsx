import { Product } from '@/utils/type'
import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/utils/format'
import FavoriteToggleButton from './FavoriteToggleButton'
import FormContainer from '../form/FormContainer'
import { createOrderAction } from '@/utils/api'
import SubmitButton from '../form/Buttons'

function ProductsList({ products }: { products: Product[] }) {
  return (
    <section className='grid gap-4'>
      {products.map((product) => {
        const { id, name, price, image, description, category } = product;
        const href = `/products/${id}`;

        return (
          <article
            key={id}
            className='group grid gap-5 rounded-[2rem] bg-card p-4 ring-1 ring-foreground/5 transition-shadow hover:shadow-lg sm:grid-cols-[180px_1fr_auto] sm:items-center'
          >
            <Link href={href} className='relative aspect-square overflow-hidden rounded-3xl sm:size-[180px]'>
              <Image
                src={image}
                alt={name}
                fill
                sizes='(max-width:640px) 100vw, 180px'
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </Link>

            <div>
              {category?.title && <p className='text-xs font-medium text-primary'>{category.title}</p>}
              <h3 className='mt-1 text-xl font-bold'>
                <Link href={href} className='hover:text-primary transition-colors'>{name}</Link>
              </h3>
              <p className='mt-2 line-clamp-2 leading-7 text-muted-foreground'>{description}</p>
            </div>

            <div className='flex items-center justify-between gap-3 border-t pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:border-s sm:ps-6 sm:pt-0'>
              <div className='flex items-center gap-2'>
                <FavoriteToggleButton productId={id} />
                <p className='font-heading text-xl font-bold'>{formatCurrency(price)}</p>
              </div>
              <FormContainer action={createOrderAction}>
                <input type="hidden" name="productId" value={id} />
                <SubmitButton text='شراء' size='default' className='mt-0 h-10 rounded-full px-8' />
              </FormContainer>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default ProductsList
