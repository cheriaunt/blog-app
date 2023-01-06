import classes from './article-list.module.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticles } from '../../services/BlogService';
import { v4 as uuidv4 } from 'uuid';

import Article from '../article';

const ArticleList = () => {
    const fullArticle = false;
    const dispatch = useDispatch();
    const param = useParams();
    const allArticles = useSelector((state) => state.articles.articles);
    const articlesCount = useSelector((state) => state.articlesCount.articlesCount);
    // console.log(articlesCount);
    // console.log(allArticles);
    // const [arrArticles, setArrArticle] = useState([]);
    const loading = useSelector((state) => state.articles.loading);
    // const [articlesNumber, setArticlesNumber] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        const page = param.page ? Number(param.page?.split('=')[1]) : 1;
        // console.log(page);
        setCurrentPage(page);
        dispatch(fetchArticles(page*5-5));
        // setArrArticle(allArticles);

        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [param.page]);
    // console.log(param.page);
    // const packArticles = allArticles.slice(currentPage*5-5, articlesNumber);
    
    const onChange = (page) => {

    // dispatch({ type: 'OFFSET', payload: page * 5 });
        // setCurrentPage(page);
        // setArrArticle([]);
        // setArticlesNumber(page*5);
        navigate(`/articles/page=${page}`);
    };
    
    
    return(
        <>
            < div >
                <ul className={classes.articleList}>
                {loading && <Spin size='large' />}
                {!loading && allArticles.length === 0 ? (
                    <h2>Статей не найдено</h2>
                ) : (
                    allArticles.map((item) => {
                    return(
                        <li className={classes.article} key={uuidv4()}>
                            <Article  newArticle={item} fullArticle={fullArticle} />
                        </li>
                    );
                    
})
                    )}
                </ul>
            </div>
            <div className={classes.pagination}>
                <Pagination current={currentPage} 
                showSizeChanger={false}
                onChange={onChange} 
                defaultPageSize={5}
                total={articlesCount}
                 />
                
            </div>
        </>
    
        
    )

};

export default ArticleList;

