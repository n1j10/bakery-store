'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import FormContainer from '../form/FormContainer';
import { Button } from '../ui/button';
import { removeCartItemAction, updateCartItemAction } from '@/utils/api';
import SelectProductAmount, { Mode } from '../single-prodcut/SelectProductAmount';

function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Saves the new amount on the backend, then refreshes totals
  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    setAmount(value);
    const result = await updateCartItemAction({ amount: value, cartItemId: id });
    toast(result.message);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className='flex items-end gap-2'>
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type='hidden' name='id' value={id} />
        <Button type='submit' variant='ghost' size='icon-lg' className='rounded-full text-destructive' aria-label='حذف من السلة'>
          <Trash2 className='size-4' />
        </Button>
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;
