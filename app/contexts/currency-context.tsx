'use client';

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

const currenciesMap = {
  USD: { label: 'USD', rate: 1, sign: '$' },
  EUR: { label: 'EUR', rate: 1 / 1.15, sign: '€' },
  UAH: { label: 'UAH', rate: 26, sign: '₴' },
};

type Currency = keyof typeof currenciesMap;

type CurrencyContext = {
  currencies: {
    key: string;
    label: string;
  }[];
  currency: Currency;
  setCurrency?: Dispatch<SetStateAction<Currency>>;
  convert?: (amount: number) => string;
};

const currencies = Object.entries(currenciesMap).map(([key, { label }]) => ({
  key,
  label,
}));

const currencyContext = createContext<CurrencyContext>({
  currencies,
  currency: 'USD',
});

const { Provider } = currencyContext;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const { rate, sign } = currenciesMap[currency];
  const convert = (amount: number) => `${(rate * amount).toFixed(2)} ${sign}`;

  return (
    <Provider value={{ currencies, currency, setCurrency, convert }}>
      {children}
    </Provider>
  );
}

export function Convert({ value }: { value: number }) {
  const { convert } = useContext(currencyContext);

  return convert!(value);
}

export default currencyContext;
