import classes from './article.module.scss';
import like from '../../source/like.svg';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Article = ({author, createdAt, description, favorited, favoritesCount, slug, tagList, title,}) => {
    const date = format(new Date(createdAt), 'PP');
    const tags = tagList.map((item) => (
<p className={`${classes['article-tag']}`} key={item.toString()}>
                 {(item.length ) ? item : null  }
                     </p>
    ));
    return (
        <>
            <div className={`${classes['article-title']}`}>
                <Link to={`/${slug}`} className={`${classes['article-head-link']}`}>
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
        </>
    )

};

export default Article;