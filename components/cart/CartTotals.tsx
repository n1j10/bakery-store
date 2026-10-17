import { ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import { createOrderAction } from '@/utils/api';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { Cart } from '@/utils/type';

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, orderTotal } = cart;
  const delivery = orderTotal - cartTotal;

  return (
    <div className='rounded-[2rem] bg-secondary/60 p-6 sm:p-8'>
      <h2 className='text-xl font-bold'>ملخص الطلب</h2>

      <dl className='mt-6 space-y-3 text-sm'>
        <div className='flex justify-between'>
          <dt className='text-muted-foreground'>المجموع الفرعي</dt>
          <dd>{formatCurrency(cartTotal)}</dd>
        </div>
        <div className='flex justify-between'>
          <dt className='text-muted-foreground'>التوصيل</dt>
          <dd>{delivery > 0 ? formatCurrency(delivery) : 'مجاني'}</dd>
        </div>
        <div className='flex justify-between border-t border-foreground/10 pt-4 text-lg font-bold'>
          <dt>الإجمالي</dt>
          <dd className='font-heading'>{formatCurrency(orderTotal)}</dd>
        </div>
      </dl>

      <FormContainer action={createOrderAction}>
        <SubmitButton text='شراء' className='mt-6 h-12 w-full rounded-full text-base' />
      </FormContainer>

      <p className='mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground'>
        <ShieldCheck className='size-4' /> الدفع عند الاستلام
      </p>
    </div>
  );
}

export default CartTotals;
