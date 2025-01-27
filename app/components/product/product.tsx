import { Convert } from '@/app/contexts/currency-context';
import { ProductWithIngredients } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import styles from './product.module.css';

function Product({
  product,
  amount,
  handleAmountChange,
}: {
  product: ProductWithIngredients;
  amount: number;
  handleAmountChange: (
    id: ProductWithIngredients['id'],
    amount: number
  ) => void;
}) {
  const { id, name, price, ingredients } = product;

  const handleAmountClick = (mode: '-' | '+') => {
    const newAmount = mode === '-' ? --amount : ++amount;

    handleAmountChange(id, newAmount);
  };

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
              {amount}
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={handleAmountClick.bind(null, '-')}
                className='rounded-md border p-2 hover:bg-gray-100'
                data-id='product-decrement'
              >
                <MinusIcon className='w-5' />
              </Button>
              <Button
                onClick={handleAmountClick.bind(null, '+')}
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
