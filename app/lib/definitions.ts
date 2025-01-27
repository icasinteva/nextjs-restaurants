// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { JSX } from 'react';

// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Tab = 'menu' | 'reviews';

export type Slug = [string, Tab];

export type Product = {
  rest_id: string;
  rest_name: string;
  name: string;
  id: string;
  price: number;
};

export type ProductWithIngredients = Product & {
  ingredients: string[];
};

export type OrderItem = ProductWithIngredients & {
  amount: number;
  subtotal: number;
};

export type Review = {
  user: string;
  rating: number;
  text: string;
};

export type MenuOrReviews<T extends Tab> = T extends 'menu'
  ? ProductWithIngredients[]
  : Review[];

export type MenuOrReviewsTabs = {
  [key in Tab]: (data: MenuOrReviews<Tab>) => JSX.Element;
};

export type Handlers = Record<
  keyof Review,
  {
    value: string | number;
    onChange: () => void;
  }
>;

export type ReviewState = {
  errors?: {
    user?: string[];
    text?: string[];
    rating?: string[];
  };
  message?: string | null;
};
