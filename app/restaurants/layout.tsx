'use client';
import Header from '@/app/components/header';
import Tabs from '../components/tabs/tabs';
// import { CurrencyProvider } from '../contexts/currency-context';
import { restaurants } from '../mocks/placeholder-data';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [, , , tab] = pathname.split('/');
  const tabs = restaurants.map(({ id, name }) => ({
    label: name,
    url: `/restaurants/${id}/${tab}`,
  }));

  // return (
  //   <CurrencyProvider>
  //     <Header />
  //     <Tabs tabs={tabs} />
  //     {children}
  //   </CurrencyProvider>
  // );

  return (
    <>
      <Tabs tabs={tabs} />
      {children}
    </>
  );
}
