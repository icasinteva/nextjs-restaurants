'use client';

import Logo from '@/app/icons/logo.svg';
import styles from './header.module.css';

// import CurrencySwitcher from '../currency-switcher';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/restaurants'>{/* <Logo /> */}</Link>
      {/* <CurrencySwitcher /> */}
    </header>
  );
};

export default Header;
