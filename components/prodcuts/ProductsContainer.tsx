import Link from 'next/link';
import { LayoutGrid, List } from 'lucide-react';
import { fetchAllCategories, fetchAllProducts } from '@/utils/api'
import { links } from '@/utils/links';
import { cn } from '@/lib/utils';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import EmptyList from '../global/EmptyList';

type ProductsContainerProps = { layout: string; search?: string; categoryId?: string };

function buildHref({ layout, search, categoryId }: ProductsContainerProps) {
  const params = new URLSearchParams({ layout });
  if (search) params.set('search', search);
  if (categoryId) params.set('category', categoryId);
  return `${links.PRODUCTS.href}?${params.toString()}`;
}

async function ProductsContainer({ layout, search, categoryId }: ProductsContainerProps) {
  const [products, categories] = await Promise.all([
    fetchAllProducts({ search, categoryId }),
    fetchAllCategories(),
  ]);
  const category = categories.find((c) => c.id === categoryId);

  const chipClass = (active: boolean) => cn(
    'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
    active ? 'bg-primary text-primary-foreground' : 'bg-secondary/70 text-secondary-foreground hover:bg-secondary',
  );

  return (
    <div className='space-y-8'>
      {/* Page header */}
      <section className='rounded-[2rem] bg-secondary/50 px-6 py-10 text-center sm:py-14'>
        <p className='text-sm font-medium text-primary'>قائمة المخبز</p>
        <h1 className='mt-2 text-3xl font-bold sm:text-4xl'>
          {category ? category.title : search ? `نتائج البحث عن "${search}"` : 'كل المنتجات'}
        </h1>
        <p className='mt-3 text-muted-foreground'>
          {category?.description || 'اختار اللي تحبه، وإحنا نخبزه ونوصله إلك طازج'}
        </p>
      </section>

      {/* Category chips + layout toggle */}
      <section className='flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0'>
          <Link href={buildHref({ layout, search })} className={chipClass(!categoryId)}>الكل</Link>
          {categories.map((c) => (
            <Link key={c.id} href={buildHref({ layout, search, categoryId: c.id })} className={chipClass(c.id === categoryId)}>
              {c.title}
            </Link>
          ))}
        </div>

        <div className='flex shrink-0 items-center justify-between gap-4 sm:justify-end'>
          <span className='text-sm text-muted-foreground'>{products.length} منتج</span>
          <div className='flex rounded-full bg-secondary/70 p-1'>
            {([['grid', LayoutGrid, 'عرض شبكي'], ['list', List, 'عرض قائمة']] as const).map(([value, Icon, label]) => (
              <Link
                key={value}
                href={buildHref({ layout: value, search, categoryId })}
                aria-label={label}
                className={cn(
                  'grid size-8 place-items-center rounded-full transition-colors',
                  layout === value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className='size-4' />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {products.length === 0 ? (
        <EmptyList title='ما لگينا منتجات' description='جرب كلمة بحث ثانية أو اختار قسم آخر.' withLink />
      ) : layout === 'list' ? (
        <ProductsList products={products} />
      ) : (
        <ProductsGrid products={products} />
      )}
    </div>
  )
}

export default ProductsContainer
