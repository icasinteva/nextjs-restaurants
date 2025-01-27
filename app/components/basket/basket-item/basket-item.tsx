import clsx from 'clsx';
import Link from 'next/link';

import { useConvert } from '@/app/hooks/use-convert';
import { UseOrder } from '@/app/hooks/use-order';
import { OrderItem } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import styles from './basket-item.module.css';

function BasketItem({
  product,
  onAmountChange,
}: {
  product: OrderItem;
  onAmountChange: Pick<UseOrder, 'decrement' | 'increment' | 'remove'>;
}) {
  const convert = useConvert();
  const { id, name, amount, subtotal, rest_id } = product;
  const { decrement, increment, remove } = onAmountChange;

  return (
    <div className={styles.basketItem}>
      <div className={styles.name}>
        <Link href={`/restaurants/${rest_id}/menu`}>{name}</Link>
      </div>
      <div className={styles.info}>
        <div className={styles.counter}>
          <Button
            onClick={decrement.bind(null, id)}
            className='rounded-md border p-2 hover:bg-gray-100'
            data-id='product-decrement'
          >
            <MinusIcon className='w-5' />
          </Button>
          <span className={styles.count}>{amount}</span>
          <Button
            onClick={increment.bind(null, id)}
            className='rounded-md border p-2 hover:bg-gray-100'
            data-id='product-decrement'
          >
            <PlusIcon className='w-5' />
          </Button>
        </div>
        <p className={clsx(styles.count, styles.price)}>
          {convert?.(subtotal)}
        </p>
        <Button
          onClick={remove.bind(null, id)}
          className='rounded-md border p-2 hover:bg-gray-100'
          data-id='product-remove'
        >
          <TrashIcon className='w-5' />
        </Button>
      </div>
    </div>
  );
}

export default BasketItem;
