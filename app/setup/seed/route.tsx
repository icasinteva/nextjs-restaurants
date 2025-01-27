import { db } from '@vercel/postgres';
import {
  restaurants,
  products,
  reviews,
  users,
  ingredients,
} from '../../mocks/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(
      async (user) => client.sql`
    INSERT INTO users (id, name)
    VALUES (${user.id}, ${user.name})
    ON CONFLICT (id) DO NOTHING;
  `
    )
  );

  return insertedUsers;
}

async function seedProducts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE IF EXISTS products`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      rest_id UUID NOT NULL,
      name VARCHAR,
      price INT NOT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => client.sql`
        INSERT INTO products (id, rest_id, name, price)
        VALUES (${product.id}, ${product.rest_id}, ${product.name}, ${product.price})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

async function seedIngredients() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE IF EXISTS ingredients`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS ingredients (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      rest_id UUID NOT NULL,
      product_id UUID NOT NULL,
      name VARCHAR
    );
  `;

  const insertedIngredients = await Promise.all(
    ingredients.map(
      (ingridient) => client.sql`
        INSERT INTO ingredients (rest_id, product_id, name)
        VALUES (${ingridient.rest_id}, ${ingridient.product_id}, ${ingridient.name})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedIngredients;
}

async function seedReviews() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`DROP TABLE reviews`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      rest_id UUID NOT NULL,
      user_id UUID NOT NULL,
      rating INT NOT NULL,
      text VARCHAR,
      date TIMESTAMP
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map(
      (review) => client.sql`
        INSERT INTO reviews (rest_id, user_id, text, rating)
        VALUES (${review.rest_id}, ${review.user_id}, ${review.text}, ${review.rating})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedReviews;
}

async function seedRestaurants() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS restaurants (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedRestaurants = await Promise.all(
    restaurants.map(
      (restaurant) => client.sql`
        INSERT INTO restaurants (id, name)
        VALUES (${restaurant.id}, ${restaurant.name})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedRestaurants;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedRestaurants();
    // await seedProducts();
    await seedIngredients();
    // await seedReviews();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
