import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import withClass from '../../hoc/withClass'
import { fetchSignUp } from '../../services/BlogService'

import styles from './sign-up-form.module.scss'

function SignUp() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const user = useSelector((state) => state.user.user)
  const serverErrors = useSelector((state) => state.user.errors)
  console.log(user, 'user')
  console.log(serverErrors)
  const navigate = useNavigate()
  const onSubmit = (data) => {
    dispatch(fetchSignUp(data.username, data.email, data.password))
  }
  useEffect(() => {
    if (user) {
      navigate('/articles')
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <h2 className={styles['form-header']}>Create new account</h2>
      <ul className={styles.inputs}>
        <li className={styles['inputs-item']}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            autoComplete='username'
            className={errors.username ? `${styles['inputs-item-input']} ${styles.error}` : styles['inputs-item-input']}
            {...register('username', {
              required: 'Please input your username!',
              maxLength: {
                value: 20,
                message: 'Your username must be between 3 and 20 characters long.',
              },
              minLength: {
                value: 3,
                message: 'Your username must be between 3 and 20 characters long.',
              },
            })}
          />
          {errors.username ? <p className={styles.errorInfo}>{errors.username.message}</p> : null}
          {serverErrors.username ? <p className={styles.errorInfo}>{serverErrors.username}</p> : null}
        </li>
        <li className={styles['inputs-item']}>
          <label htmlFor='email'>Email address</label>
          <input
            type='text'
            id='email'
            placeholder='Email address'
            className={errors.email ? `${styles['inputs-item-input']} ${styles.error}` : styles['inputs-item-input']}
            {...register('email', { required: 'Please input your email!' })}
          />
          {errors.email ? <p className={styles.errorInfo}>{errors.email.message}</p> : null}
          {serverErrors.email ? <p className={styles.errorInfo}>{serverErrors.email}</p> : null}
        </li>
        <li className={styles['inputs-item']}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            autoComplete='current-password'
            className={errors.password ? `${styles['inputs-item-input']} ${styles.error}` : styles['inputs-item-input']}
            {...register('password', {
              required: 'Please input your password!',
              maxLength: {
                value: 40,
                message: 'Your password must be between 6 and 40 characters long.',
              },
              minLength: {
                value: 6,
                message: 'Your password must be between 6 and 40 characters long.',
              },
            })}
          />
          {errors.password ? <p className={styles.errorInfo}>{errors.password.message}</p> : null}
        </li>
        <li className={styles['inputs-item']}>
          <label htmlFor='repeatPassword'>Password</label>
          <input
            type='password'
            id='repeatPassword'
            placeholder='Repeat Password'
            autoComplete='current-password'
            className={
              errors.repeatPassword ? `${styles['inputs-item-input']} ${styles.error}` : styles['inputs-item-input']
            }
            {...register('repeatPassword', {
              required: 'Please confirm password!',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues()
                  return password === value || 'Passwords should match!'
                },
              },
            })}
          />
          {errors.repeatPassword ? <p className={styles.errorInfo}>{errors.repeatPassword.message}</p> : null}
        </li>
      </ul>
      <label className={styles.check}>
        <input className={styles.input} type='checkbox' {...register('agree', { required: true })} />
        <span className={styles.checkbox} />I agree to the processing of my personal information
      </label>
      {errors.agree ? <p className={styles.errorInfo}>Should accept agreement</p> : null}
      <input className={styles['sign-up-btn']} type='submit' value='Create' />
      <div className={styles.info}>
        <span className={styles['info-grey']}>Already have an account?</span>
        <Link to='/sign-in' className={styles['info-blue']}>
          {' '}
          Sign In.
        </Link>
      </div>
    </form>
  )
}

export default withClass(SignUp, styles.signUp)
