'use client';

import { createContext } from 'react';

import useOrder, { UseOrder } from '@/app/hooks/use-order';
import { ProductWithIngredients } from '@/app/lib/definitions';

const OrderContext = createContext<Partial<UseOrder>>({});

const { Provider } = OrderContext;

export const OrderProvider = ({
  products,
  children,
}: {
  products: ProductWithIngredients[];
  children: React.ReactNode;
}) => {
  const basketHook = useOrder(products);

  return <Provider value={basketHook}>{children}</Provider>;
};

export default OrderContext;
