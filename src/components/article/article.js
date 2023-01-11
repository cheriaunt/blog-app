import styles from './article.module.scss';
import like from '../../source/like.svg';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import commentGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
// import { Popconfirm } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchArticles, fetchDeleteArticle } from '../../services/BlogService';
import { Modal } from 'antd';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchArticle } from '../../services/ArticleService';
// import { useParams } from 'react-router-dom';


const Article = ({newArticle, fullArticle}) => {
    const {  body, favorited, description, slug, favoritesCount, tagList, title, author, createdAt } = newArticle;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [onDelete, setDelete] = useState(false);
    const allArticles = useSelector((state) => state.articles.articles)
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    // const error = useSelector((state) => state.user.errors);
    // console.log(error);
    const date = format(new Date(createdAt), 'LLLL d, y');
    const tags = !!tagList ? tagList.filter((item)=> (item !== null && item !== ''&& item !== ' ')).map((item) => (
        <p className={`${styles['article-tag']}`} key={uuidv4()}>
                     {item}
                         </p>
        )): null;
    useEffect(() => {
      if (onDelete === true && allArticles) {
        // dispatch(fetchArticles());
        navigate('/articles');
        setDelete(false);
      }
    },[allArticles])
    const bodyMarkdown = body ? body : null;
    const showBody = fullArticle ? (
        <div className={`${styles['post-body']}`}>< ReactMarkdown  children={bodyMarkdown} remarkPlugins={[commentGfm]} /></div>
    ) : null;
    // console.log(token);
    const buttonDelete =
    fullArticle && author.username === username ? (
      <button className={styles.delete} onClick={() => ShowConfirm(slug, token, dispatch, setDelete)}>
        Delete
      </button>
    ) : null
    const buttonEdit =
    fullArticle && author.username === username ? (
      <Link className={styles.edit} to={`/article/${slug}/edit`}>
        Edit
      </Link>
    ) : null

    return (
        <>
            <div className={`${styles['article-title']}`}>
                <Link to={`/article/${slug}`} className={`${styles['article-head-link']}`}>
                 <h5 className={`${styles['article-head']}`}>{title}</h5>
                </Link>
                <button className={` ${styles['article-btn']}`}>
                <img src={like} alt="like" className={`${styles['article-like']}`}/>
                </button>
                <p className={`${styles['article-likeNum']}`}>{favoritesCount}
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

const ShowConfirm = (slug, token, dispatch, setDelete) => {
    const { confirm } = Modal
    confirm({
      wrapClassName: 'modalWindow',
      title: 'Are you sure to delete this article?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        setDelete(true);
        dispatch(fetchDeleteArticle( slug, token));
        dispatch(fetchArticles());
      },
      onCancel() {
        console.log('Cancel');
      },
    })
//     const confirm = (e) => {
//         console.log(e);
//         message.success('Click on Yes');
//       };
      
//       const cancel = (e) => {
//         console.log(e);
//         message.error('Click on No');
//       };
//       <Popconfirm
//         title="Delete the task"
//         description="Are you sure to delete this task?"
//         onConfirm={confirm}
//         onCancel={cancel}
//         okText="Yes"
//         cancelText="No"
//         placement={'right'} 
//         >
//         <a href="#">Delete</a>
//   </Popconfirm>

}