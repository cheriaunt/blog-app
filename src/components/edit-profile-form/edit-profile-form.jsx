import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import withClass from '../../hoc/withClass'
import { fetchEditProfile } from '../../services/BlogService'
import { getToken } from '../../utils/getToken'

import styles from './edit-profile-form.module.scss'

const EditProfile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    },
    mode: 'onChange',
  })

  const serverErrors = useSelector((state) => state.user.errors)
  console.log(user, 'dataNew')
  console.log(serverErrors, 'serverErrors')
  const navigate = useNavigate()
  const [editProfile, setEditProfile] = useState(false)
  const onSubmit = (data) => {
    let token = getToken()
    dispatch(fetchEditProfile(data.email, data.username, token, data.password, data.image))
    setEditProfile(true)
  }
  useEffect(() => {
    if (editProfile) {
      setEditProfile(false)
      navigate('/articles')
    }
  })

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <h2 className={styles['form-header']}>Edit Profile</h2>
      <ul className={styles['inputs']}>
        <li className={styles['inputs-item']}>
          <label htmlFor={'username'}>Username</label>
          <input
            type='text'
            id={'username'}
            placeholder='Username'
            autoComplete='current-username'
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
          <label htmlFor={'email'}>Email address</label>
          <input
            type='text'
            id='email'
            placeholder='Email address'
            autoComplete='current-email'
            className={errors.email ? `${styles['inputs-item-input']} ${styles.error}` : styles['inputs-item-input']}
            {...register('email', { required: 'Please input your email!' })}
          />
          {errors.email ? <p className={styles.errorInfo}>{errors.email.message}</p> : null}
          {serverErrors.email ? <p className={styles.errorInfo}>{serverErrors.email}</p> : null}
        </li>
        <li className={styles['inputs-item']}>
          <label htmlFor={'new password'}> New password</label>
          <input
            type='password'
            id='new password'
            placeholder='New password'
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
          <label htmlFor='image'>Avatar image (url)</label>
          <input
            type='url'
            id='image'
            placeholder='Avatar image'
            autoComplete='image'
            className={errors.image ? `${styles['inputs-item-input']} ${styles.error}` : styles['inputs-item-input']}
            {...register('image', { required: false })}
          />
        </li>
      </ul>
      <input className={styles['sign-up-btn']} type='submit' value='Save' />
    </form>
  )
}

export default withClass(EditProfile, styles.editProfile)
