import classes from './layout.module.scss';
import { NavLink, Outlet } from 'react-router-dom';


const Layout = () => {
    return (
        <>
         <header className={classes.header}>
            <button className={`${classes['header-name']} ${classes['btn-header']}`}>Realworld Blog
            </button>
            <button className={`${classes['header-signIn']} ${classes['btn-header']}`}>Sign In
            </button>
            <button className={`${classes['header-signUp']} ${classes['btn-header']}`}>Sign Up
                
            </button>
            <NavLink to="articles">ListPage</NavLink>
            <NavLink to="articles/slug">ArticlePage</NavLink>
        </header>
        <main>
            <Outlet />
        </main>
        </>
        
    )

};

export default Layout;