import { Route, Routes, Navigate} from 'react-router-dom';
import classes from'./index.module.scss';


import ListPage from './pages/ListPage';
import ArticlePage from './pages/ArticlePage';
import Layout from './components/layout'
import withClass from './hoc/withClass';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import EditProfilePage from './pages/EditProfilePage';
import EditArticlePage from './pages/EditArticlePage';
import CreateArticlePage from './pages/NewArticlePage';
import NotFoundPage from './pages/NotFoundPage';




const App = () => {
  return (
    <>
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
                element={<NotFoundPage/>}/>
        </Routes>
    </>
  );
}

export default withClass (App, classes.app);
