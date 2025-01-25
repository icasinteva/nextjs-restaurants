import styles from './banner.module.css';

import banner from './banner.jpg';
import Image from 'next/image';

const Banner = ({
  heading,
  children,
}: {
  heading: string;
  children?: React.ReactNode;
}) => (
  <div className={styles.banner}>
    <Image src={banner} className={styles.img} alt='banner' />
    <div className={styles.caption}>
      <h2 className={styles.heading}>{heading}</h2>
      <div>{children}</div>
    </div>
  </div>
);

export default Banner;
