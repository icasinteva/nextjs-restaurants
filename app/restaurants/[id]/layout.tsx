import Banner from '@/app/components/banner';
import Tabs from '@/app/components/tabs/tabs';
import { restaurants } from '@/app/mocks/placeholder-data';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tabs = [
    { label: 'Menu', url: `/restaurants/${id}/menu` },
    { label: 'Reviews', url: `/restaurants/${id}/reviews` },
  ];
  const restaurant = restaurants.find((rest) => rest.id === id);
  const { name, menu, reviews } = restaurant!;

  return (
    <>
      <Banner heading={name}>{/* <Rate value={averageRating} /> */}</Banner>
      <Tabs tabs={tabs} />
      {children}
    </>
  );
}
