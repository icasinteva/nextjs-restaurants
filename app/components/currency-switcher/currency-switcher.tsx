import { useContext } from 'react';
import currencyContext from '../../contexts/currency-context';

import styles from './currency-switcher.module.css';

const CurrencySwitcher = () => {
  const { currency, currencies, setCurrency } = useContext(currencyContext);

  const onChange = (e: any) => setCurrency!(e.target.value);

  return (
    <fieldset className={styles.switcher}>
      {currencies.map(({ key, label }) => (
        <label key={key} className={styles.switcherBtn}>
          <input
            type='radio'
            value={key}
            checked={key === currency}
            onChange={onChange}
          />
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default CurrencySwitcher;
