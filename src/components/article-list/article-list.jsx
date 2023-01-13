import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, Pagination } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { fetchArticles } from '../../services/BlogService'
import Article from '../article'

import classes from './article-list.module.scss'

const ArticleList = () => {
  const fullArticle = false
  const dispatch = useDispatch()
  const param = useParams()
  const allArticles = useSelector((state) => state.articles.articles)
  const articlesCount = useSelector((state) => state.articles.articlesCount)
  const loading = useSelector((state) => state.articles.loading)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  useEffect(() => {
    const page = param.page ? Number(param.page?.split('=')[1]) : 1
    setCurrentPage(page)
    dispatch(fetchArticles(page * 5 - 5))
  }, [param.page])
  const onChange = (page) => {
    navigate(`/articles/page=${page}`)
  }

  return (
    <>
      <div>
        <ul className={classes.articleList}>
          {loading && <Spin size='large' />}
          {!loading && allArticles.length === 0 ? (
            <h2>Статей не найдено</h2>
          ) : (
            allArticles.map((item) => {
              return (
                <li className={classes.article} key={uuidv4()}>
                  <Article newArticle={item} fullArticle={fullArticle} />
                </li>
              )
            })
          )}
        </ul>
      </div>
      <div className={classes.pagination}>
        <Pagination
          current={currentPage}
          showSizeChanger={false}
          onChange={onChange}
          defaultPageSize={5}
          total={articlesCount}
        />
      </div>
    </>
  )
}

export default ArticleList
