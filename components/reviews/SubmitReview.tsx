"use client"

import { useState } from 'react';
import { PenLine } from 'lucide-react';
import FormContainer from '../form/FormContainer'
import { createReviewAction } from '@/utils/api';
import RatingInput from './RatingInput';
import TextAreaInput from '../form/TextAreaInput';
import SubmitButton from '../form/Buttons';
import { Button } from '../ui/button';

// The author name/image come from the logged-in user on the backend.
function SubmitReview({ id }: { id: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='mt-8'>
      <Button variant='outline' className='h-10 rounded-full px-5 gap-2' onClick={() => setIsVisible((prev) => !prev)}>
        <PenLine className='size-4' />
        {isVisible ? 'إخفاء النموذج' : 'اكتب تقييمك'}
      </Button>

      {isVisible && (
        <div className='mt-6 max-w-2xl rounded-[2rem] bg-card p-6 ring-1 ring-foreground/5 sm:p-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='productId' value={id} />
            <RatingInput name='rating' labelText='التقييم' />
            <TextAreaInput name='comment' labelText='رأيك بالمنتج' />
            <SubmitButton text='نشر التقييم' className='rounded-full px-8' />
          </FormContainer>
        </div>
      )}
    </div>
  )
}

export default SubmitReview
