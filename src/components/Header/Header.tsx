import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.nav}>
      <button className={styles.btn} type="button" onClick={() => navigate('/')}>
        <span className={styles.header}>Не ВатсАпп</span>
      </button>
    </div>
  );
};

export default Header;
