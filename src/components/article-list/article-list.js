import classes from './article-list.module.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import { fetchArticles } from '../../services/ArticleService';
import { v4 as uuidv4 } from 'uuid';



import Article from '../article';

const ArticleList = () => {
    const dispatch = useDispatch();
    const allArticles = useSelector((state) => state.articles.articles);
    const loading = useSelector((state) => state.articles.loading);
    const [articlesNumber, setArticlesNumber] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(fetchArticles())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    console.log(allArticles);
    const packArticles = allArticles.slice(currentPage*5-5, articlesNumber);
    
    const onChange = (page) => {
        setCurrentPage(page);
        setArticlesNumber(page*5);
    };
    return(
        <>
            < div >
                <ul className={classes.articleList}>
                {loading && <Spin size='large' />}
                {!loading && allArticles.length === 0 ? (
                    <h2>Статей не найдено</h2>
                ) : (
                    packArticles.map((item) => (
                    <Article
                        key={uuidv4()}
                        author={item.author}
                        body={item.body}
                        createdAt={item.createdAt}
                        description={item.description}
                        favorited={item.favorited}
                        favoritesCount={item.favoritesCount}
                        slug={item.slug}
                        tagList={item.tagList}
                        title={item.title}
                    />
                    ))
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

