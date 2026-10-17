import { CheckCircle2 } from 'lucide-react';
import SectionTitle from '@/components/global/SectionTitle';
import EmptyList from '@/components/global/EmptyList';
import { fetchUserOrders } from '@/utils/api';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';

async function OrdersPage() {
    const orders = await fetchUserOrders();

    if (orders.length === 0) {
        return <EmptyList title='ما عندك طلبات بعد' description='أول طلب إلك راح يطلع هنا.' withLink />;
    }

    return (
        <>
            <SectionTitle eyebrow={`${orders.length} طلب`} text='طلباتي' />
            <div className='grid gap-4'>
                {orders.map((order) => {
                    const { products, orderTotal, createdAt, product } = order;
                    return (
                        <article
                            key={order.id}
                            className='flex flex-wrap items-center gap-4 rounded-3xl bg-card p-5 ring-1 ring-foreground/5 sm:flex-nowrap'
                        >
                            <span className='grid size-12 shrink-0 place-items-center rounded-2xl bg-secondary text-primary'>
                                <CheckCircle2 className='size-6' />
                            </span>
                            <div className='min-w-0 flex-1'>
                                <h3 className='font-bold'>{product.name}</h3>
                                <p className='mt-1 text-sm text-muted-foreground'>
                                    {formatDate(createdAt)} · {formatTime(createdAt)}
                                </p>
                            </div>
                            <span className='rounded-full bg-secondary px-3 py-1 text-sm'>× {products}</span>
                            <p className='font-heading text-lg font-bold sm:min-w-32 sm:text-end'>{formatCurrency(orderTotal)}</p>
                        </article>
                    );
                })}
            </div>
        </>
    );
}

export default OrdersPage;
