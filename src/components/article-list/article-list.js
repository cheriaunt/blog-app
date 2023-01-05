import classes from './article-list.module.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchArticles } from '../../services/ArticleService';
import { v4 as uuidv4 } from 'uuid';

import Article from '../article';

const ArticleList = () => {
    const fullArticle = false;
    const dispatch = useDispatch();
    const params = useParams();
    const allArticles = useSelector((state) => state.articles.articles);
    const loading = useSelector((state) => state.articles.loading);
    const [articlesNumber, setArticlesNumber] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        // const page = params.page ? Number(params.page?.split('=')[1]) : 1;
        // setCurrentPage(page);
        dispatch(fetchArticles())

        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    console.log(params);
    const packArticles = allArticles.slice(currentPage*5-5, articlesNumber);
    
    const onChange = (page) => {
        setCurrentPage(page);
        setArticlesNumber(page*5);
        navigate(`/articles/#/page=${page}`);
    };
    
    
    return(
        <>
            < div >
                <ul className={classes.articleList}>
                {loading && <Spin size='large' />}
                {!loading && allArticles.length === 0 ? (
                    <h2>Статей не найдено</h2>
                ) : (
                    packArticles.map((item) => {
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
                onChange={onChange} total={50} />
            </div>
        </>
    
        
    )

};

export default ArticleList;

