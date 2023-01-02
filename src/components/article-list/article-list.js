import classes from './article-list.module.scss';


import Article from '../article';

const ArticleList = () => {
    return(
    < div className={classes.articleList}>
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
    </div>
        
    )

};

export default ArticleList;

