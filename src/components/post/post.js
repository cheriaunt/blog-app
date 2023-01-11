import classes from './post.module.scss';
import withClass from '../../hoc/withClass';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticle } from '../../services/BlogService';
import { useParams} from 'react-router-dom';
import { Spin } from 'antd';


import Article from '../article/article';

const Post = () => {
    
    
    return (
        <>
            {loading && <Spin size='large' />}
            {view}
        </>
        
    )

};

export default withClass(Post, classes.post);