import classes from '../components/article/article.module.scss';
import withClass from '../hoc/withClass';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticle } from '../services/BlogService';
import { useParams} from 'react-router-dom';
import { Spin } from 'antd';
import Article from '../components/article/article';



const ArticlePage = () => {
  const fullArticle = true;
  const dispatch = useDispatch();
  const params = useParams();
  const article = useSelector((state) => state.article.article);
  const loading = useSelector((state) => state.article.loading);
  useEffect(() => {
      dispatch(fetchArticle(params.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
  const view = !loading && article ? <Article newArticle={article} fullArticle={fullArticle}  /> : null
  return (
    <>
      {loading && <Spin size='large' />}
            {view}
    </> 
  );
}

export default withClass(ArticlePage, classes.post);