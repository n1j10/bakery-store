import SectionTitle from '../global/SectionTitle'
import ReviewCard from './ReviewCard';
import { Review } from '@/utils/type';

function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <SectionTitle eyebrow='آراء الزبائن' text='شنو گالوا عنه' />
      {reviews.length === 0 ? (
        <p className='rounded-3xl bg-secondary/50 p-8 text-center text-muted-foreground'>
          ماكو تقييمات لهذا المنتج بعد.
        </p>
      ) : (
        <div className='grid gap-6 md:grid-cols-2'>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewInfo={{
                comment: review.comment,
                rating: review.rating,
                image: review.user?.imageUrl || '',
                name: review.user?.name || 'زبون',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductReviews
