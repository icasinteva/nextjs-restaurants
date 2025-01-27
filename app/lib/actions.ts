'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { ReviewState } from './definitions';

const FormSchema = z.object({
  id: z.string(),
  user: z
    .string()
    .nonempty({ message: 'Please enter a name. Name is required!' }),
  rating: z.coerce.number().gt(0, {
    message: 'Please enter a rating greater than 0. Rating is required',
  }),
  text: z
    .string()
    .nonempty({ message: 'Please enter a review. Review is required!' }),
});

export async function postReviewByRestId(
  restId: string,
  prevState: ReviewState,
  formData: FormData
) {
  const validatedFields = FormSchema.omit({ id: true }).safeParse({
    user: formData.get('user'),
    rating: formData.get('rating'),
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Post Review.',
    };
  }

  const { user, rating, text } = validatedFields.data;

  try {
    const userId = uuidv4();

    const createUserPromise = sql`
      INSERT INTO users (id, name)
      VALUES (${userId}, ${user})
    `;

    const publishReviewPromise = sql`
      INSERT INTO reviews (rest_id, user_id, text, rating)
      VALUES (${restId}, ${userId}, ${text}, ${rating})
    `;

    await Promise.all([createUserPromise, publishReviewPromise]);
  } catch (error) {
    console.error(error);
  }

  revalidatePath(`/restaurants/${restId}/reviews`);
  redirect(`/restaurants/${restId}/reviews`);
}
