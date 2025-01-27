'use client';
import { useCallback, useMemo, useState } from 'react';
import { OrderItem, ProductWithIngredients } from '../lib/definitions';

export type UseOrder = {
  orderProducts: OrderItem[];
  total: number;
  decrement: (id: string) => void;
  increment: (id: string) => void;
  remove: (id: string) => void;
  getAmount: (id: string) => number;
};

export default function useOrder(products: ProductWithIngredients[]) {
  const initialBasketState: Record<string, number> = {};

  const [basket, setBasket] = useState(initialBasketState);

  const orderProducts = useMemo(
    () =>
      products
        .filter((product) => {
          return basket[product.id];
        })
        .map((product) => {
          const amount = basket[product.id];

          return {
            ...product,
            amount,
            subtotal: product.price * amount,
          };
        }),
    [basket]
  );

  const total = orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0);

  const decrement = (id: string) => {
    const res = Object.keys(basket).length
      ? {
          ...basket,
          [id]: basket[id] > 0 ? basket[id] - 1 : 0,
        }
      : {
          [id]: basket[id] > 0 ? basket[id] - 1 : 0,
        };

    setBasket(res);
  };

  const increment = (id: string) => {
    const res = Object.keys(basket).length
      ? {
          ...basket,
          [id]: (basket[id] || 0) + 1,
        }
      : {
          [id]: (basket[id] || 0) + 1,
        };
    setBasket(res);
  };

  const remove = (id: string) => {
    const res = { ...basket };

    delete res[id];

    setBasket(res);
  };

  const getAmount = useCallback((id: string) => basket[id] || 0, [basket]);

  return { orderProducts, total, getAmount, decrement, increment, remove };
}
