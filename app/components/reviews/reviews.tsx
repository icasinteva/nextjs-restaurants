'use client';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import animationStyles from './reviews-animation.module.css';
import { MenuOrReviews } from '@/app/lib/definitions';

const Reviews = ({
  reviews,
  restId,
}: {
  reviews: MenuOrReviews<'reviews'>;
  restId: string;
}) => {
  debugger;
  return (
    <div className={styles.reviews}>
      <TransitionGroup>
        {reviews.map((review) => (
          <CSSTransition
            key={review.user}
            timeout={500}
            classNames={animationStyles}
          >
            <Review review={review} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <ReviewForm restId={restId} />
    </div>
  );
};

export default Reviews;
