import ReactMarkdown from 'react-markdown';
import commentGfm from 'remark-gfm';
import classes from './post.module.scss';
import withClass from '../../hoc/withClass';

import Article from '../article/article';

const Post = () => {
    const markdown = `A paragraph with *emphasis* and **strong importance**.

    > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
    
    * Lists
    * [ ] todo
    * [x] done
    
    A table:
    
    | a | b |
    | - | - |
    `
    

    return (
        <>
            < Article />
            <div className={`${classes['post-body']}`}>< ReactMarkdown children={markdown} commentPlugins={[commentGfm]} /></div>
        </>
        
    )

};

export default withClass(Post,classes.post);