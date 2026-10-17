import CartItemsList from '@/components/cart/CartItemsList';
import CartTotals from '@/components/cart/CartTotals';
import SectionTitle from '@/components/global/SectionTitle';
import EmptyList from '@/components/global/EmptyList';
import { fetchCart } from '@/utils/api';

async function CartPage() {
  // GET /cart returns the cart with recalculated totals (created if missing)
  const currentCart = await fetchCart();
  const { cartItems } = currentCart;

  if (cartItems.length === 0) {
    return <EmptyList title='سلتك فارغة' description='ضيف شي حلو من قائمتنا وارجع هنا.' withLink />;
  }

  return (
    <>
      <SectionTitle eyebrow={`${currentCart.numItemsInCart} قطعة`} text='سلة المشتريات' />
      <div className='grid gap-8 lg:grid-cols-12 lg:items-start'>
        <div className='lg:col-span-8'>
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className='lg:col-span-4 lg:sticky lg:top-36'>
          <CartTotals cart={currentCart} />
        </div>
      </div>
    </>
  );
}

export default CartPage;
