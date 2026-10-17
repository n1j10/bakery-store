import React from 'react'
import { Quote } from 'lucide-react'
import Rating from './Rating'
import UserIcon from '../navbar/UserIcon'

type ReviewInfoProps = {
  reviewInfo: {
    name: string,
    image: string,
    rating: number,
    comment: string,
  },
  children?: React.ReactNode
}

function ReviewCard({ reviewInfo, children }: ReviewInfoProps) {
  const { name, image, rating, comment } = reviewInfo;
  return (
    <figure className='relative flex flex-col rounded-[2rem] bg-card p-6 ring-1 ring-foreground/5'>
      <Quote className='absolute top-6 end-6 size-8 text-honey/50' />
      <Rating rating={rating} />
      <blockquote className='mt-4 flex-1 leading-8'>{comment}</blockquote>
      <figcaption className='mt-6 flex items-center gap-3 border-t pt-4'>
        {/* UserIcon falls back to the first letter when there is no photo */}
        <span className='[&>*]:size-10 [&>*]:text-sm'>
          <UserIcon imageUrl={image || null} name={name} />
        </span>
        <span className='font-bold'>{name}</span>
      </figcaption>
      {children}
    </figure>
  )
}

export default ReviewCard
