import { Review as ReviewType } from '@/app/lib/definitions';
import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({ review }: { review: ReviewType }) => {
  const { user, text, rating } = review;

  return (
    <div className={styles.review} data-id='review'>
      <div className={styles.content}>
        <div>
          <h4 className={styles.name} data-id='review-user'>
            {user}
          </h4>
          <p className={styles.comment} data-id='review-text'>
            {text}
          </p>
        </div>
        <div className={styles.rate}>
          <Rate value={rating} />
        </div>
      </div>
    </div>
  );
};

export default Review;
