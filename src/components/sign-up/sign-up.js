// import ArticlePage from "../../pages/ArticlePage";
import { Link } from "react-router-dom";
// import { useEffect } from "react";
import styles from './sign-up.module.scss';

import withClass from "../../hoc/withClass";

const SignUp = () => {
    return (
        <>
            <form className={styles['sign-up-form']}>
                <h2 className={styles['sign-header']}>Create new account
                </h2>
                <ul className={styles['inputs']}>
                    <li className={styles['inputs-item']}>
                        <label for="username" >Username
                        </label>
                        <input type='text' id='username' placeholder='Username' className={styles['inputs-item-input']}/>
                    </li>
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
                    <li className={styles['inputs-item']}>
                    <label for="repeat password" >Password
                        </label>
                        <input type='text' id='repeat password'placeholder={'Repeat Password'} className={styles['inputs-item-input']}/>
                    </li>
                </ul>   
                <label className={styles['check']}>
                <input
                    className={ styles.input}
                    type='checkbox'
                    checked
                />
                <span className={styles.checkbox}></span>I agree to the processing of my personal information
                </label>
                <input className={styles['sign-up-btn']}type="submit" value="Create" />
                <div className={styles.info}>
                <span className={styles['info-grey']}>Already have an account? 
                </span>
                <Link to={'/sign-in'} className={styles['info-blue']}> Sign In.</Link>
                </div>
                
            </form>
        </>
    )
    
  };

export default withClass(SignUp, styles.signUp);