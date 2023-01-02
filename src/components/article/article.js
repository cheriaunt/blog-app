import classes from './article.module.scss';
import like from '../../source/like.svg';
import { Link } from 'react-router-dom';
import  authorFoto from '../../source/authorFoto.svg';

const Article = () => {
    return (
        <>
            <div className={`${classes['article-title']}`}>
                <Link to='/articles/slug' className={`${classes['article-head-link']}`}>
                 <h5 className={`${classes['article-head']}`}>Some article title</h5>
                </Link>
                <button className={` ${classes['article-btn']}`}>
                <img src={like} alt="like" className={`${classes['article-like']}`}/>
                </button>
                <p className={`${classes['article-likeNum']}`}>12
                </p>
                <Link to='/profile'>
                 <h6 className={`${classes['article-author']}`}>John Doe</h6>
                </Link>
                <p className={`${classes['article-createdAt']}`}>March 5, 2020</p>
                <img src={authorFoto} alt="authorfoto" className={`${classes['article-author-foto']}`}/>
                
            </div>
            
            <div className={`${classes['article-tags']}`}>
                <p className={`${classes['article-tag']}`}>Tag 1</p>
            </div>
            <p className={`${classes['article-description']}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </>
    )

};

export default Article;