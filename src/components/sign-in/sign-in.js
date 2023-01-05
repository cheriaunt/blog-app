// import ArticlePage from "../../pages/ArticlePage";
import { Link} from "react-router-dom";
// import { useEffect } from "react";
import styles from './sign-in.module.scss';

import withClass from "../../hoc/withClass";

const SignIn = () => {
    return (
        <>
          <form>
            <h2 className={styles['sign-header']}>Sign In
            </h2>
            <ul className={styles['inputs']}>
              <li className={styles['inputs-item']}>
                  <label for="email" >Email address
                  </label>
                  <input type='text' id='email' placeholder={'Email address'} className={styles['inputs-item-input']}/>
              </li>
              <li className={styles['inputs-item']}>
                  <label for="password" >Password
                  </label>
                  <input type='text' id='password' placeholder={'Password'} className={styles['inputs-item-input']}/>
              </li>
            </ul>  
            <input className={styles['sign-up-btn']}type="submit" value="Login" />
            <div className={styles.info}>
              <span className={styles['info-grey']}>Don't have an account? 
              </span>
              <Link to={'/sign-up'} className={styles['info-blue']}> Sign Up.</Link>
            </div>
          </form>
        </> 
    )
    
  };

export default withClass(SignIn, styles.signIn);