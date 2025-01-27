import Star from '@/app/icons/star.svg';
import clsx from 'clsx';

import styles from './rate.module.css';

const Rate = ({
  value,
  onChange,
}: {
  value: number;
  onChange?: (rate: number) => void;
}) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        data-id={i <= value - 1 ? 'full-star' : 'empty-star'}
        className={clsx(styles.star, {
          [styles.checked]: i <= value - 1,
          // [styles.unknown]: value === 0,
          [styles.clickable]: !!onChange,
        })}
        onClick={onChange ? () => onChange(i + 1) : undefined}
      />
    ))}
  </div>
);

export default Rate;
