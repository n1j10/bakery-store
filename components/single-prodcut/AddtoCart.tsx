'use client';

import { useState } from 'react';
import SelectProductAmount, { Mode } from './SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { ProductSignInButton, SubmitButton } from '../form/Buttons';
import { addToCartAction } from '@/utils/api';

function AddToCart({ productId, isSignedIn }: { productId: string; isSignedIn: boolean }) {
  const [amount, setAmount] = useState(1);

  if (!isSignedIn) return <ProductSignInButton />;

  return (
    <div className='mt-8 flex flex-wrap items-end gap-4'>
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      <FormContainer action={addToCartAction}>
        <input type='hidden' name='productId' value={productId} />
        <input type='hidden' name='amount' value={amount} />
        <SubmitButton text='أضف إلى السلة' className='mt-0 h-12 rounded-full px-8 text-base' />
      </FormContainer>
    </div>
  );
}

export default AddToCart;
