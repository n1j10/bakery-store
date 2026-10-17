import Image from 'next/image';
import { Leaf, Truck } from 'lucide-react';
import FavoriteToggleButton from '@/components/prodcuts/FavoriteToggleButton';
import ProductReviews from '@/components/reviews/ProductReviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import AddtoCart from '@/components/single-prodcut/AddtoCart';
import BreadCrumb from '@/components/single-prodcut/BreadCrumb';
import ProductRating from '@/components/single-prodcut/ProductRating';
import ShareButton from '@/components/single-prodcut/shareButton';
import EmptyList from '@/components/global/EmptyList';
import { fetchProductReviews, fetchSingleProduct, isSignedIn } from '@/utils/api';
import { formatCurrency } from '@/utils/format';

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const product = await fetchSingleProduct(id).catch(() => null);
    if (!product) {
        return <EmptyList title='المنتج غير موجود' description='يمكن انحذف أو الرابط غلط.' withLink />;
    }

    const [signedIn, reviews] = await Promise.all([
        isSignedIn(),
        fetchProductReviews(id).catch(() => []),
    ]);
    const { name, image, description, price, category } = product;

    return (
        <div className='space-y-20'>
            <section>
                <BreadCrumb name={name} category={category ?? undefined} />

                <div className='mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16'>
                    <div className='relative aspect-square overflow-hidden rounded-[2.5rem] bg-muted shadow-xl'>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            priority
                            className='object-cover'
                            sizes='(max-width:1024px) 100vw, 50vw'
                        />
                    </div>

                    <div className='flex flex-col'>
                        {category?.title && (
                            <span className='w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground'>
                                {category.title}
                            </span>
                        )}
                        <h1 className='mt-4 text-3xl font-bold leading-snug sm:text-4xl'>{name}</h1>
                        <ProductRating reviews={reviews} />

                        <p className='mt-6 font-heading text-3xl font-bold text-primary'>{formatCurrency(price)}</p>
                        <p className='mt-6 text-lg leading-9 text-muted-foreground'>{description}</p>

                        <AddtoCart productId={id} isSignedIn={signedIn} />

                        <div className='mt-6 flex items-center gap-2'>
                            <FavoriteToggleButton productId={id} />
                            <ShareButton id={id} name={name} />
                        </div>

                        <div className='mt-auto grid gap-3 pt-10 sm:grid-cols-2'>
                            <div className='flex items-center gap-3 rounded-2xl bg-secondary/60 p-4 text-sm'>
                                <Truck className='size-5 text-primary' /> توصيل خلال ساعة داخل بغداد
                            </div>
                            <div className='flex items-center gap-3 rounded-2xl bg-secondary/60 p-4 text-sm'>
                                <Leaf className='size-5 text-primary' /> مخبوز اليوم بمكونات طبيعية
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <ProductReviews reviews={reviews} />
                {signedIn && <SubmitReview id={id} />}
            </section>
        </div>
    )
}

export default ProductDetailsPage
