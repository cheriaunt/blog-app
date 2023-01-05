import classes from './article.module.scss';
import like from '../../source/like.svg';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import commentGfm from 'remark-gfm';
import { v4 as uuidv4 } from 'uuid';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchArticle } from '../../services/ArticleService';
// import { useParams } from 'react-router-dom';


const Article = ({newArticle, fullArticle}) => {
    // const dispatch = useDispatch();
    // const params = useParams();
    console.log(newArticle);
    const {  body, favorited, description, slug, favoritesCount, tagList, title, author, createdAt } = newArticle;
    const date = format(new Date(createdAt), 'LLLL d, y');
    const tags = !!tagList ? tagList.map((item) => (
        <p className={`${classes['article-tag']}`} key={uuidv4()}>
                     {item ? item : null  }
                         </p>
        )): null;
        
    const showBody = fullArticle ? (
        <div className={`${classes['post-body']}`}>< ReactMarkdown  commentPlugins={[commentGfm]} />{body ? body : null}</div>
    ) : null;
    

    return (
        <>
            <div className={`${classes['article-title']}`}>
                <Link to={`/articles/${slug}`} className={`${classes['article-head-link']}`}>
                 <h5 className={`${classes['article-head']}`}>{title}</h5>
                </Link>
                <button className={` ${classes['article-btn']}`}>
                <img src={like} alt="like" className={`${classes['article-like']}`}/>
                </button>
                <p className={`${classes['article-likeNum']}`}>{favoritesCount}
                </p>
                <Link to='/profile'>
                 <h6 className={`${classes['article-author']}`}>{author.username}</h6>
                </Link>
                <p className={`${classes['article-createdAt']}`}>{date}</p>
                <img src={`${author.image}`} alt="authorfoto" className={`${classes['article-author-foto']}`}/>
                
            </div>
            
            <div className={`${classes['article-tags']}`}>
                {tags}
            </div>
            <p className={`${classes['article-description']}`}>{description}</p>
            {showBody}
        </>
    )

};

export default Article;