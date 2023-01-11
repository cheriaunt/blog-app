import { Outlet } from 'react-router-dom';
import Layout from '../components/layout/layout';

const ListPage = () => {
  return (
    <>
      <Layout />
      <Outlet/>
    </> 
  );
}

export default ListPage;