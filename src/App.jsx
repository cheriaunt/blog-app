// import { fetchGetUser } from './services/BlogService';
import { Route, Routes, Navigate, Link} from 'react-router-dom';
// import{ useEffect, useState} from 'react';
import classes from'./index.module.scss';


import ListPage from './pages/ListPage';
import ArticlePage from './pages/ArticlePage';
import Layout from './components/layout'
import withClass from './hoc/withClass';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import EditProfilePage from './pages/EditProfilePage';
import UserContext from './context';
import EditArticlePage from './pages/EditArticlePage';
import CreateArticlePage from './pages/NewArticlePage';
// import { useDispatch } from 'react-redux';
import { Alert } from 'antd';




const App = () => {
    // const dispatch = useDispatch();
    // const [user, setUser] = useState();
    // const [token, setToken] = useState(localStorage.getItem('token')); 
    // useEffect(()=>{
    //     if (token) {
    //         dispatch(fetchGetUser(token));
    //     }
    // });

//     let token = localStorage.getItem('token');
//     useEffect(() => {
//         dispatch(fetchGetUser(token));
//     }, [token])
  return (
    <>
        <UserContext.Provider value={{}}>
            <Routes>
                <Route path="/" element={<Layout />} >
                <Route path="/" element={<Navigate to="/articles" />} />
                    <Route index element={<ListPage />} /> 
                    <Route path="articles" element={<ListPage />} >
                    {/* <Route path="#" element={<ListPage />} > */}
                            <Route path=':page' element={<ListPage />}/>
                        
                    </Route>
                    <Route path="article/:slug" element={<ArticlePage/>} />
                    <Route path="sign-in" element={<SignInPage/>} />
                    <Route path="sign-up" element={<SignUpPage/>} />
                    <Route path="profile" element={<EditProfilePage/>} />
                    <Route path='article/:slug/edit' element={<EditArticlePage/>} />
                    <Route path='new-article' element={<CreateArticlePage/>} />

                    
                </Route>
                <Route
                    path="*"
                    // element={<Alert message={`This page does not exist, you can return to the ${<Link to="/articles">main page!</Link>}`} type='info' showIcon />
                    element={
                    <div >
                        <p>
                        This page does not exist, you can return to the <Link to="/articles">main page!</Link>
                        </p>
                    </div>
                    }
                />
            </Routes>
        </UserContext.Provider>
    </>
  );
}

export default withClass (App, classes.app);
