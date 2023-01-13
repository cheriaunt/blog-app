import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ArticleForm from '../components/article-form/article-form'
import { fetchArticle, fetchEditArticle } from '../services/BlogService'
import { getToken } from '../utils/getToken'

function EditArticlePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [onEdit, setEdit] = useState(false)
  const Article = useSelector((state) => state.article.article)
  let defaultValues = {
    title: '',
    description: '',
    text: '',
    tags: [],
  }
  if (Article) {
    const { title, description, body, tagList } = Article
    defaultValues = {
      title,
      description,
      text: body,
      tags: tagList,
    }
  }
  const title = 'Edit article'
  const formSubmit = (data) => {
    const { description, text, title, tags } = data
    const token = getToken()
    dispatch(fetchEditArticle(title, description, text, tags, token, Article.slug))
    dispatch(fetchArticle(Article.slug))
    setEdit(true)
  }
  useEffect(() => {
    if (onEdit === true && Article) {
      setEdit(false)
      navigate(`/article/${Article.slug}`)
    }
  }, [Article])
  return (
    <>
      <ArticleForm title={title} defaultValues={defaultValues} formSubmit={formSubmit} />
    </>
  )
}

export default EditArticlePage
