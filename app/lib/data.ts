import { sql } from '@vercel/postgres';

import { formatCurrency } from './utils';
import {
  MenuOrReviews,
  Product,
  ProductWithIngredients,
  Review,
  Slug,
} from './definitions';

export async function fetchFirstRestaurantId() {
  try {
    const data = await sql`
      SELECT
        id
      FROM restaurants
      LIMIT 1
    `;

    return data.rows[0].id;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchTmp([id, tab]: Slug) {
  try {
    const data = await sql`
      SELECT
        id,
        name
      FROM restaurants
    `;

    const restaurants = data.rows;

    const tabs = restaurants.map(({ id, name }) => ({
      label: name,
      url: `/restaurants/${id}/${tab}`,
    }));

    const focusedRestaurantName = restaurants.find(
      (rest) => rest.id === id
    )?.name;

    const getTabsById = (rid: string) => {
      return [
        { label: 'Menu', url: `/restaurants/${rid}/menu` },
        { label: 'Reviews', url: `/restaurants/${rid}/reviews` },
      ];
    };

    const rating = await sql`
      SELECT AVG(reviews.rating)
      FROM reviews
      WHERE reviews.rest_id = ${id}
    `;

    return {
      tabs,
      focusedRestaurant: {
        tabs: getTabsById(id),
        rating: +rating.rows[0].avg,
        name: focusedRestaurantName,
      },
    };
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFocusedRestaurantData([id, tab]: Slug) {
  try {
    const tabToPromise = {
      menu: fetchMenu,
      reviews: fetchReviews,
    };

    return await tabToPromise[tab](id);
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch restaurant.');
  }
}

export async function fetchMenu(id: string) {
  try {
    const products = await sql`
      SELECT
        restaurants.id as rest_id,
        restaurants.name as rest_name,
        products.id,
        products.price,
        products.name
      FROM products
      LEFT JOIN restaurants ON products.rest_id = restaurants.id
      WHERE restaurants.id = ${id}
    `;

    const productsWithIngredients = [];

    for (const product of products.rows) {
      const ingredients = await sql`
        SELECT
          name
        FROM ingredients
        WHERE ingredients.product_id = ${product.id}
        `;

      productsWithIngredients.push({
        ...product,
        ingredients: ingredients.rows.map(({ name }) => name),
      });
    }

    return productsWithIngredients as ProductWithIngredients[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch restaurant.');
  }
}

export async function fetchReviews(id: string) {
  try {
    const data = await sql`
      SELECT
        reviews.text,
        reviews.rating,
        users.name as user
      FROM reviews
      JOIN users ON users.id = reviews.user_id
      WHERE reviews.rest_id = ${id}
    `;

    return data.rows as Review[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch restaurant.');
  }
}
