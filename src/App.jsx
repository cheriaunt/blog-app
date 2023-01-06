import { fetchGetUser } from './services/BlogService';
import { Route, Routes, Navigate} from 'react-router-dom';
import{ useEffect, useState} from 'react';
import classes from'./index.module.scss';


import ListPage from './pages/ListPage';
import ArticlePage from './pages/ArticlePage';
import Layout from './components/layout'
import withClass from './hoc/withClass';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import EditProfilePage from './pages/EditProfilePage';
import UserContext from './context';
// import { useDispatch } from 'react-redux';



const App = () => {
    // const dispatch = useDispatch();
    // const [user, setUser] = useState();
    // const [token, setToken] = useState(localStorage.getItem('token')); 
    // useEffect(()=>{
    //     if (token) {
    //         dispatch(fetchGetUser(token));
    //     }
    // });

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

                    
                </Route>
            </Routes>
        </UserContext.Provider>
    </>
  );
}

export default withClass (App, classes.app);
