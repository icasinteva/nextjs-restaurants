import Banner from '@/app/components/banner';
import Rate from '@/app/components/rate';
import Tabs from '@/app/components/tabs/tabs';
import { fetchTmp } from '@/app/lib/data';
import { Slug } from '@/app/lib/definitions';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: Slug }>;
}) {
  const { slug } = await params;

  const {
    tabs: restTabs,
    focusedRestaurant: { name, tabs, rating },
  } = await fetchTmp(slug);

  return (
    <>
      <Tabs tabs={restTabs} />
      <Banner heading={name}>
        <Rate value={rating} />
      </Banner>
      <Tabs tabs={tabs} />
      {children}
    </>
  );
}
