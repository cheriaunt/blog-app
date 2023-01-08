// import ArticlePage from "../../pages/ArticlePage";
import { Link, useNavigate} from "react-router-dom";
// import { useEffect } from "react";
import styles from './sign-in-form.module.scss';

import withClass from "../../hoc/withClass";
// import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignIn } from '../../services/BlogService';
import {useForm} from 'react-hook-form';
import { useEffect } from "react";
// import UserContext from "../../context";

const SignIn = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur',
});
  const user = useSelector((state) => state.user.user);
  const serverErrors = useSelector((state) => state.user.errors);
  console.log(user, 'user');
  console.log(serverErrors, 'serverErrors' );
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(fetchSignIn(data.email, data.password));
  }
  useEffect(() => {
    if (user) {
      navigate('/articles')
    }
  }, [user])
    return (
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <h2 className={styles['form-header']}>Sign In
            </h2>
            <ul className={styles['inputs']}>
              <li className={styles['inputs-item']}>
                  <label htmlFor='email' >Email address
                  </label>
                  <input type='text' id='email' placeholder={'Email address'} autoComplete='username' className={ errors.email ? `${styles['inputs-item-input']} ${styles.error}`: styles['inputs-item-input']} {...register('email', { required: 'Please input your email!' })}/>
                  {errors.email ? <p className={styles.errorInfo}>{errors.email.message}</p> : null}
                  {serverErrors['email or password'] ? <p className={styles.errorInfo}>email or password {serverErrors['email or password']}</p> : null}
              </li>
              <li className={styles['inputs-item']}>
                  <label htmlFor='password' >Password
                  </label>
                  <input type='password' id='password' placeholder='Password' suggested="current-password" autoComplete='current-password' name="password" className={ 
                      errors.password ? `${styles['inputs-item-input']} ${styles.error}`: styles['inputs-item-input']} {...register('password', {
                      required: 'Please input your password!',
                      maxLength: {
                        value: 40,
                        message: 'Your password must be between 6 and 40 characters long.',
                      },
                      minLength: {
                        value: 6,
                        message: 'Your password must be between 6 and 40 characters long.',
                      },
                    })}/>
                {errors.password ? <p className={styles.errorInfo}>{errors.password.message}</p> : null}
                {serverErrors['email or password'] ? <p className={styles.errorInfo}>email or password {serverErrors['email or password']}</p> : null}
              </li>
            </ul>  
            <input className={styles['sign-up-btn']}type="submit" value="Login" />
            <div className={styles.info}>
              <span className={styles['info-grey']}>Don't have an account? 
              </span>
              <Link to={'/sign-up'} className={styles['info-blue']}> Sign Up.</Link>
            </div>
          </form>
    )
    
  };

export default withClass(SignIn, styles.signIn);