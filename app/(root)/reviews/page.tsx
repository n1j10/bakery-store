import Link from 'next/link';
import ReviewCard from '@/components/reviews/ReviewCard';
import SectionTitle from '@/components/global/SectionTitle';
import EmptyList from '@/components/global/EmptyList';
import { fetchAllReviews } from '@/utils/api';

const ReviewsPage = async () => {
    const reviews = await fetchAllReviews().catch(() => null);

    if (!reviews) {
        return <EmptyList title='هذي الصفحة للإدارة فقط' description='تگدر تشوف تقييمات أي منتج من صفحة المنتج نفسه.' withLink />;
    }

    if (reviews.length === 0) {
        return <EmptyList title='ماكو تقييمات بعد' />;
    }

    return (
        <>
            <SectionTitle eyebrow={`${reviews.length} تقييم`} text='كل التقييمات' />
            <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        reviewInfo={{
                            name: review.user?.name || 'زبون',
                            image: review.user?.imageUrl || '',
                            rating: review.rating,
                            comment: review.comment,
                        }}
                    >
                        <p className='mt-3 text-sm text-muted-foreground'>
                            تقييم لـ{' '}
                            <Link
                                href={`/products/${review.product?.id}`}
                                className='font-medium text-primary underline-offset-4 hover:underline'
                            >
                                {review.product?.name}
                            </Link>
                        </p>
                    </ReviewCard>
                ))}
            </div>
        </>
    )
}

export default ReviewsPage
