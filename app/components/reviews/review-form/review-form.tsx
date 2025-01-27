import { Button } from '@/app/ui/button';
import Rate from '../../rate';

import styles from './review-form.module.css';
import { ReviewState } from '@/app/lib/definitions';
import { postReviewByRestId } from '@/app/lib/actions';
import { useActionState, useState } from 'react';

const INITIAL_VALUES = { name: '', text: '', rating: 3 };

const ReviewForm = ({ restId }: { restId: string }) => {
  const initialState: ReviewState = { message: null, errors: {} };
  const postReview = postReviewByRestId.bind(null, restId);
  const [state, formAction] = useActionState(postReview, initialState);
  //   user,
  //   text,
  //   rating: { value, onChange },
  // } = handlers as Handlers;

  // const handleSubmit = (ev: any) => {
  //   ev.preventDefault();
  //   // addReview(values, restId);
  //   reset();
  // };
  const [rating, setRating] = useState(0);

  return (
    <div className={styles.reviewForm}>
      <h4 className={styles.addReviewTitle}>Leave your review</h4>
      <form action={formAction}>
        <div className={styles.reviewFormItem}>
          <input
            id='user'
            name='user'
            type='text'
            placeholder='Your name'
            className={styles.message}
            aria-describedby='user-error'
          />
          <div id='name-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.user &&
              state.errors.user.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.reviewFormItem}>
          <textarea
            id='text'
            name='text'
            placeholder='Your review'
            className={styles.message}
            aria-describedby='text-error'
            // {...text}
          />
          <div id='text-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.text &&
              state.errors.text.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className={styles.rateWrap}>
          <fieldset>
            <input
              type='number'
              id='rating'
              name='rating'
              value={rating}
              hidden
            />
            <span>Rating: </span>
            <span>
              <Rate value={rating} onChange={setRating} />
            </span>
            <div id='name-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.rating &&
                state.errors.rating.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </div>
        <div className={styles.publish}>
          <Button className='primary block'>PUBLISH REVIEW</Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
