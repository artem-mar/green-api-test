import React from 'react';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  console.log();

  return (
    <div className={styles.page}>
      <Header />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
