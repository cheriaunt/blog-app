import classes from './layout.module.scss';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGetUser } from '../../services/BlogService';
// import UserContext from '../../context';
// import { useContext } from 'react';


const Layout = () => {
    const dispatch = useDispatch();
    // const { user, setUser, setToken } = useContext(UserContext);

    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(fetchGetUser(token));
    }, [token])
    const  avatar = 'https://static.productionready.io/images/smiley-cyrus.jpg'
    let user = useSelector((state) => state.user.user);
    let avatarImage = '';
    if (user) {
        avatarImage = user.image ? user.image : avatar;
    }
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
    const toCreateArticle = () =>{
        navigate(`/new-article`);
    }
    const toEditProfile = () =>{
        navigate(`/profile`);
    }
    const toLogOut = () =>{
        dispatch({ type: 'LOG_OUT'});
        localStorage.removeItem('token');
        navigate(`/articles`);
    }
    // "https://static.productionready.io/images/smiley-cyrus.jpg"
    return (
        <>
         <header className={classes.header}>
            <button className={`${classes['header-name']} ${classes['btn-header']}`} onClick={toHomepage}>Realworld Blog
            </button>
            {!user ? (
                <>
                    <button className={`${classes['header-signIn']} ${classes['btn-header']}`} onClick={toSignIn}>Sign In
                    </button>
                    <button className={`${classes['header-right']} ${classes['btn-header']}`} onClick={toSignUp}>Sign Up  
                    </button>
                </>
             ) : (
                <>
                    <button className={`${classes['header-createArticle']} ${classes['btn-header']}`} onClick={toCreateArticle}>Create article
                    </button>
                    <button className={`${classes['header-author']}  ${classes['btn-header']}`} onClick={toEditProfile}>{user.username}</button>
                    <img src={avatarImage} alt="authorfoto" className={`${classes['header-author-foto']}`}/>
                
                    <button className={`${classes['header-right']} ${classes['btn-header']}`} onClick={toLogOut}>Log Out  
                    </button>
                </>
            
            )}
            
        </header>
        <main>
            <Outlet />
        </main>
        </>
        
    )

};

export default Layout;