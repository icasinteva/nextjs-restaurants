'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './tabs.module.css';

function Tabs({ tabs }: { tabs: { label: string; url: string }[] }) {
  const pathname = usePathname();

  return (
    <div className={styles.tabs}>
      {tabs.map(({ label, url }) => (
        <Link
          key={label}
          href={url}
          className={clsx(`${styles.tab}`, {
            [styles.active]: pathname === url,
          })}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default Tabs;
