'use client';

import { FirstColumn, SecondColumn, FourthColumn } from './CartItemColumns';
import ThirdColumn from './ThirdColumn';
import { CartItemWithProduct } from '@/utils/type';

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div className='divide-y rounded-[2rem] bg-card px-4 ring-1 ring-foreground/5 sm:px-6'>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const { image, name, price, id: productId, description } = cartItem.product;
        return (
          <article key={id} className='flex flex-wrap items-center gap-4 py-5 sm:flex-nowrap sm:gap-6'>
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} description={description} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price * amount} />
          </article>
        );
      })}
    </div>
  );
}

export default CartItemsList;
