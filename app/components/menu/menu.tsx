'use client';
import { MenuOrReviews, ProductWithIngredients } from '@/app/lib/definitions';
import { useState } from 'react';
import Product from '../product';

import styles from './menu.module.css';

const Menu = ({ data }: { data: MenuOrReviews<'menu'> }) => {
  const basketState: Record<ProductWithIngredients['id'], number> = {};

  data.forEach(({ id }) => {
    basketState[id] = 0;
  });

  const [basket, setBasket] = useState<Record<string, number>>(basketState);

  const handleAmountChange = (id: string, amount: number) => {
    setBasket({
      ...basket,
      [id]: amount,
    });
  };

  return (
    <div className={styles.menu}>
      <div>
        {data.map((product) => {
          const { id } = product;
          let amount = basket[id];

          return (
            <Product
              key={id}
              product={product}
              amount={amount}
              handleAmountChange={handleAmountChange}
            />
          );
        })}
      </div>
      {/* <div>
        <Basket />
      </div> */}
    </div>
  );
};

export default Menu;
