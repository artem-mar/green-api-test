import React, { useState } from 'react';
import cn from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import { useAuth } from '../../hooks';

type Inputs = {
  apiToken: string;
  idInstance: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [feedback, setFeedback] = useState('');

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ apiToken, idInstance }) => {
    const host = 'https://api.green-api.com';
    try {
      const { data } = await axios.get(`${host}/waInstance${idInstance.trim()}/getStateInstance/${apiToken.trim()}`);
      if (data.stateInstance === 'authorized') {
        logIn(idInstance, apiToken);
        navigate('/');
      } else {
        setFeedback('Авторизуйтесь в системе green-api');
      }
    } catch (err) {
      setFeedback('Неправильные данные авторизации');
      reset();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formBox}>
        <div className={styles.formHeader}>Авторизация</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formItem}>
            <label htmlFor="idInstance" className={styles.formLabel}>
              Instance id
            </label>
            <input
              required
              placeholder="id"
              type="text"
              id="idInstance"
              className={styles.formInput}
              {...register('idInstance')}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="apiToken" className={styles.formLabel}>
              Api token
            </label>
            <input
              required
              placeholder="token"
              type="text"
              id="apiToken"
              className={styles.formInput}
              {...register('apiToken')}
            />
          </div>
          <div className={styles.feedback}>{feedback}</div>
          <button disabled={isSubmitting} type="submit" className={styles.formButton}>
            Принять
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
