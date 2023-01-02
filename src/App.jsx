import { Route, Routes} from 'react-router-dom';
import classes from'./index.module.scss';

import ListPage from './pages/ListPage';
import ArticlePage from './pages/ArticlePage';
import Layout from './components/layout'
import withClass from './hoc/withClass';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >

            <Route path="articles" element={<ListPage />} />
            <Route path="articles/slug" element={<ArticlePage/>} />

            <Route index element={<ListPage />} /> 
        </Route>
      </Routes>
    </>
  );
}

export default withClass (App, classes.app);
