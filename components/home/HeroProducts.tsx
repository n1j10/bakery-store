import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionTitle from '../global/SectionTitle'
import ProductsGrid from '../prodcuts/ProductsGrid'
import { fetchFeaturedProducts } from '@/utils/api';
import EmptyList from '../global/EmptyList';
import { links } from '@/utils/links';

async function FeaturedProducts() {
  const featuredProducts = await fetchFeaturedProducts();

  if (featuredProducts.length === 0) return <EmptyList title="ماكو منتجات مميزة حالياً" />

  return (
    <section>
      <SectionTitle
        eyebrow='الأكثر طلباً'
        text='اختيارات الزبائن'
        action={
          <Link href={links.PRODUCTS.href} className='inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4'>
            عرض الكل <ArrowLeft className='size-4' />
          </Link>
        }
      />
      <ProductsGrid products={featuredProducts} />
    </section>
  )
}

export default FeaturedProducts
