import classes from './layout.module.scss';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';


const Layout = () => {
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
    return (
        <>
         <header className={classes.header}>
            <button className={`${classes['header-name']} ${classes['btn-header']}`} onClick={toHomepage}>Realworld Blog
            </button>
            <button className={`${classes['header-signIn']} ${classes['btn-header']}`} onClick={toSignIn}>Sign In
            </button>
            <button className={`${classes['header-signUp']} ${classes['btn-header']}`} onClick={toSignUp}>Sign Up
                
            </button>
            <NavLink to="/articles">ListPage</NavLink>
            <NavLink to="/articles/slug">ArticlePage</NavLink>
        </header>
        <main>
            <Outlet />
        </main>
        </>
        
    )

};

export default Layout;