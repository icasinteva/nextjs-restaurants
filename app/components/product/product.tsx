import { useContext } from 'react';

import OrderContext from '@/app/contexts/order-context';
import { Convert } from '@/app/contexts/currency-context';
import { UseOrder } from '@/app/hooks/use-order';
import { ProductWithIngredients } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import styles from './product.module.css';

function Product({ product }: { product: ProductWithIngredients }) {
  const { id, name, price, ingredients } = product;
  const { getAmount, decrement, increment } = useContext(
    OrderContext
  ) as UseOrder;

  return (
    <div className={styles.product} data-id='product'>
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{name}</h4>
          <p className={styles.description}>{ingredients.join(', ')}</p>
          <div className={styles.price}>
            <Convert value={price} />
          </div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id='product-amount'>
              {getAmount(id)}
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={decrement.bind(null, id)}
                className='rounded-md border p-2 hover:bg-gray-100'
                data-id='product-decrement'
              >
                <MinusIcon className='w-5' />
              </Button>
              <Button
                onClick={increment.bind(null, id)}
                className='rounded-md border p-2 hover:bg-gray-100'
                data-id='product-decrement'
              >
                <PlusIcon className='w-5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
