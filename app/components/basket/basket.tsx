import { useContext } from 'react';

import OrderContext from '@/app/contexts/order-context';
import { useConvert } from '@/app/hooks/use-convert';
import { UseOrder } from '@/app/hooks/use-order';

import BasketItem from './basket-item';
import itemStyles from './basket-item/basket-item.module.css';

import './basket.css';
import styles from './basket.module.css';

function Basket({ title = 'Basket' }: { title?: string }) {
  const convert = useConvert();

  const { orderProducts, total, ...onAmountChange } = useContext(
    OrderContext
  ) as UseOrder;

  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  return (
    <div className={styles.basket}>
      {/* <h4 className={styles.title}>
        <UserConsumer>{({ name }) => `${name}'s ${title}`}</UserConsumer>
      </h4> */}
      {/* <TransitionGroup>
        {orderProducts.map((product) => (
          <CSSTransition
            key={product.id}
            timeout={500}
            classNames='basket-item'
          >
            <BasketItem product={product} />
          </CSSTransition>
        ))}
      </TransitionGroup> */}
      {orderProducts.map((product) => (
        <BasketItem product={product} onAmountChange={onAmountChange} />
      ))}
      <hr className={styles.hr} />
      <div className={itemStyles.basketItem}>
        <div className={itemStyles.name}>
          <p>Total</p>
        </div>
        <div className={itemStyles.info}>
          <p>{convert?.(total)}</p>
        </div>
      </div>
      {/* <Switch>
        <Route path='/checkout'>
          <Button primary block onClick={createOrder}>
            send order
          </Button>
        </Route>
        <Route>
          <Link to='/checkout'>
            <Button primary block>
              go to checkout
            </Button>
          </Link>
        </Route>
      </Switch> */}
    </div>
  );
}

export default Basket;
