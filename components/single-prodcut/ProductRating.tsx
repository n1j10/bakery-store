import { Review } from '@/utils/type';
import Rating from '../reviews/Rating';

// Average of the product's real reviews
function ProductRating({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className='mt-3 text-sm text-muted-foreground'>ماكو تقييمات بعد — كون أول واحد يقيّم</p>;
  }

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className='mt-3 flex items-center gap-2 text-sm'>
      <Rating rating={Math.round(average)} />
      <span className='font-bold'>{average.toFixed(1)}</span>
      <span className='text-muted-foreground'>({reviews.length} تقييم)</span>
    </div>
  )
}

export default ProductRating
