import { formatCurrency } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';

export const FirstColumn = ({ name, image }: { image: string; name: string; }) => {
  return (
    <div className='relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24'>
      <Image
        src={image}
        alt={name}
        fill
        sizes='96px'
        className='object-cover'
      />
    </div>
  );
};

export const SecondColumn = ({ name, productId, description }: { name: string; description: string; productId: string; }) => {
  return (
    <div className='min-w-0 flex-1'>
      <Link href={`/products/${productId}`}>
        <h3 className='font-bold hover:text-primary transition-colors'>{name}</h3>
      </Link>
      {description && <p className='mt-1 line-clamp-1 text-sm text-muted-foreground'>{description}</p>}
    </div>
  );
};

export const FourthColumn = ({ price }: { price: number }) => {
  return <p className='font-heading font-bold sm:min-w-28 sm:text-end'>{formatCurrency(price)}</p>;
};
