'use client';
import { OrderProvider } from '@/app/contexts/order-context';
import { MenuOrReviews } from '@/app/lib/definitions';
import Basket from '../basket';
import Product from '../product';

import styles from './menu.module.css';

const Menu = ({ data }: { data: MenuOrReviews<'menu'> }) => {
  return (
    <OrderProvider products={data}>
      <div className={styles.menu}>
        <div>
          {data.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    </OrderProvider>
  );
};

export default Menu;
