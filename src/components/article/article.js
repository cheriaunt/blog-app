import styles from './article.module.scss';
import like from '../../source/like.svg';
import unlike from '../../source/unlike.svg';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import commentGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchArticles, fetchDeleteArticle, fetchFavoriteAnArticle, fetchUnFavoriteAnArticle } from '../../services/BlogService';
import { Popconfirm } from 'antd';
import { getToken } from '../../utils/getToken';


const Article = ({newArticle, fullArticle}) => {
    const {  body, favorited, description, slug, favoritesCount, tagList, title, author, createdAt } = newArticle;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [onDelete, setDelete] = useState(false);
    const [hadLike, setHadLike] = useState(favorited)
    const [numberLikes, setNumberLikes] = useState(favoritesCount)
    const allArticles = useSelector((state) => state.articles.articles);
    const username = localStorage.getItem('username');
    const token = getToken();
    const date = format(new Date(createdAt), 'LLLL d, y');
    const tags = !!tagList ? tagList.filter((item)=> (item !== null && item !== ''&& item !== ' ')).map((item) => (
        <p className={`${styles['article-tag']}`} key={uuidv4()}>{item}</p>)): null;
    const onLike = () => {
      let likes = numberLikes
      if (token !== 'null') {
        if (hadLike === false) {
          dispatch(fetchFavoriteAnArticle(slug))
          setHadLike(true)
          setNumberLikes(++likes)
        } else {
          dispatch(fetchUnFavoriteAnArticle(slug))
          setHadLike(false)
          setNumberLikes(--likes)
        }
      }
    }
    const onEdit = () =>{
      navigate(`/article/${slug}/edit`);
    }
    useEffect(() => {
      if (onDelete === true && allArticles) {
        // dispatch(fetchArticles());
        navigate('/articles');
        setDelete(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allArticles])
    const confirm = (e) => {
      setDelete(true);
      dispatch(fetchDeleteArticle(slug));
      dispatch(fetchArticles());
    };
    const cancel = (e) => {
      console.log('Cancel');
    };
    const bodyMarkdown = body ? body : null;
    const showBody = fullArticle ? (
        <div className={`${styles['post-body']}`}>< ReactMarkdown  children={bodyMarkdown} remarkPlugins={[commentGfm]} /></div>
    ) : null;
    const buttonDelete =
    fullArticle && author.username === username ? (
      <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          placement='rightTop'
          >
      <button className={`${styles.delete} ${styles['article-btn']}`} >
        Delete
      </button>
      </Popconfirm>
    ) : null
    const buttonEdit =
    fullArticle && author.username === username ? (
      <button className={`${styles.edit} ${styles['article-btn']}`} onClick={onEdit}>
        Edit
      </button>
    ) : null

    return (
        <>
            <div className={`${styles['article-title']}`}>
                <Link to={`/article/${slug}`} className={`${styles['article-head-link']}`}>
                 <h5 className={`${styles['article-head']}`}>{title}</h5>
                </Link>
                <button className={`${styles['article-btn']}`} onClick={onLike}>
                <img src={hadLike ? unlike : like} alt="like" className={`${styles['article-like']}`}/>
                </button>
                <p className={`${styles['article-likeNum']}`}>{numberLikes}
                </p>
                <h6 className={`${styles['article-author']}`}>{author.username}</h6>
                <p className={`${styles['article-createdAt']}`}>{date}</p>
                <img src={`${author.image}`} alt="authorfoto" className={`${styles['article-author-foto']}`}/>
                
            </div>
            
            <div className={`${styles['article-tags']}`}>
                {tags}
            </div>
            <p className={`${styles['article-description']}`}>{description}</p>
            {showBody}
            {buttonDelete}
            {buttonEdit}
        </>
    )

};

export default Article;