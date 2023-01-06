// import ArticlePage from "../../pages/ArticlePage";
import { Link, useNavigate} from "react-router-dom";
// import { useEffect } from "react";
import styles from './sign-in-form.module.scss';

import withClass from "../../hoc/withClass";
// import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignIn } from '../../services/BlogService';
import {useForm} from 'react-hook-form';
// import UserContext from "../../context";

const SignIn = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur',
});
  const data = useSelector((state) => state.user.user)
  const serverErrors = useSelector((state) => state.error.error);
  console.log(data, 'data');
  console.log(serverErrors);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    dispatch(fetchSignIn(data.email, data.password));
    navigate(`/articles`);
  }
    return (
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <h2 className={styles['form-header']}>Sign In
            </h2>
            <ul className={styles['inputs']}>
              <li className={styles['inputs-item']}>
                  <label htmlFor='email' >Email address
                  </label>
                  <input type='text' id='email' placeholder={'Email address'} autoComplete='username' className={ errors.email ? `${styles['inputs-item-input']} ${styles.error}`: styles['inputs-item-input']} {...register('email', { required: 'Please input your email!' })}/>
                  {errors.email ? <p>{errors.email.message}</p> : null}
                  {serverErrors['email or password'] ? <p>email or password {serverErrors['email or password']}</p> : null}
              </li>
              <li className={styles['inputs-item']}>
                  <label htmlFor='password' >Password
                  </label>
                  <input type='password' id='password' placeholder='Password' suggested="current-password" autoComplete='current-password' name="password" className={ 
          errors.password ? `${styles['inputs-item-input']} ${styles.error}`: styles['inputs-item-input']} {...register('password', {
                      required: 'Please input your password!',
                      maxLength: {
                        value: 20,
                        message: 'Your password must be between 6 and 20 characters long.',
                      },
                      minLength: {
                        value: 6,
                        message: 'Your password must be between 6 and 20 characters long.',
                      },
                    })}/>
                {errors.password ? <p>{errors.password.message}</p> : null}
                {serverErrors['email or password'] ? <p>email or password {serverErrors['email or password']}</p> : null}
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