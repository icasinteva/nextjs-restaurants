import Menu from '@/app/components/menu';
import Reviews from '@/app/components/reviews';
import { fetchFocusedRestaurantData } from '@/app/lib/data';
import { MenuOrReviews, MenuOrReviewsTabs, Slug } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: Slug }>;
}) {
  const { slug } = await params;
  const [id, tab] = slug;

  const data = await fetchFocusedRestaurantData(slug);

  const renderer: MenuOrReviewsTabs = {
    menu: (data) => <Menu data={data as MenuOrReviews<'menu'>} />,
    reviews: (data) => (
      <Reviews reviews={data as MenuOrReviews<'reviews'>} restId={id} />
    ),
  };

  return renderer[tab](data);
}
