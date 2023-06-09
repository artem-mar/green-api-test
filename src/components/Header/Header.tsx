import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.header}>not WhatsApp</span>
      </div>
    </div>
  );
};

export default Header;
