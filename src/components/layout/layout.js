import classes from './layout.module.scss';
import { useNavigate, Outlet } from 'react-router-dom';
// import UserContext from '../../context';
// import { useContext } from 'react';


const Layout = () => {
    // const { user, setUser, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const toHomepage = () =>{
        navigate(`/articles`);
    }
    const toSignIn = () =>{
        navigate(`/sign-in`);
    }
    const toSignUp = () =>{
        navigate(`/sign-up`);
    }
    // "https://static.productionready.io/images/smiley-cyrus.jpg"
    return (
        <>
         <header className={classes.header}>
            <button className={`${classes['header-name']} ${classes['btn-header']}`} onClick={toHomepage}>Realworld Blog
            </button>
            <button className={`${classes['header-signIn']} ${classes['btn-header']}`} onClick={toSignIn}>Sign In
            </button>
            <button className={`${classes['header-signUp']} ${classes['btn-header']}`} onClick={toSignUp}>Sign Up
                
            </button>
        </header>
        <main>
            <Outlet />
        </main>
        </>
        
    )

};

export default Layout;