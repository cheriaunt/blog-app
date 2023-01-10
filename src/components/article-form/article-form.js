import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate} from "react-router-dom";
import withClass from "../../hoc/withClass";
import { fetchCreateArticle } from "../../services/BlogService";
import { v4 as uuidv4 } from 'uuid';

import styles from './article-form.module.scss';
import { useEffect, useState } from "react";

const ArticleForm = () => {
    const articleTitle = 'create';
    const title = articleTitle ? 'Create new article' : 'Edit article' ;
    const [onCreate, setCreate] = useState(false);
    const user = useSelector((state) => state.user.user);
    const userArticle = useSelector((state) => state.article.article);
    console.log(userArticle, 'article');
    console.log(user,'user');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formSubmit = (data) => {
    const { description, text, title, tags } = data;
    // const article = {
    //   title,
    //   description,
    //   body: text,
    //   tagList: tags,
    // };
    const token = localStorage.getItem('token');
    dispatch(fetchCreateArticle(title, description, text, tags, token));
    setCreate(true);
    
    };
    
    let defaultValues = {
        title: '',
        description: '',
        text: '',
        tags: [],
      };
    //   if (userArticle) {
    //     const { title,description, body, tagList } = userArticle;
    //     defaultValues = {
    //       title: title,
    //       description: description,
    //       text: body,
    //       tags: tagList,
    //     };
    //   }
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { dirtyFields, errors },
    } = useForm({ mode: 'onBlur', defaultValues,
    });
    const serverErrors = useSelector((state) => state.user.errors);
    // console.log(user, 'user');
    // console.log(serverErrors, 'serverErrors' );
    const { fields, remove, append } = useFieldArray({
        name: 'tags',
        control,
      });
    // const content = (!user)? (<Navigate to="/sign-up" replace />): ()
    useEffect(() => {
        if (onCreate === true && userArticle) {
            setCreate(false);
            navigate(`/article/${userArticle.slug}`);
        }
      }, [userArticle])
    
    return (
        <form onSubmit={handleSubmit((data) => formSubmit(data, dirtyFields))}>
            {
        (!user) ? (<Navigate to="/sign-in" replace />) : (
            <>
            <h2 className={styles['form-header']}>{title}</h2>
            <ul className={styles['inputs']}>
                <li className={styles['inputs-item']}>
                    <label htmlFor='title'>Title
                    </label>
                    <input type={'text'} id='title' placeholder='Title' className={errors.title ? `${styles['inputs-item-input']} ${styles.error}`: styles['inputs-item-input']} {...register('title', { required: 'Please input your title!' })}/>
                    {errors.title ? <p className={styles.errorInfo}>{errors.title.message}</p> : null}
                </li>
                <li className={styles['inputs-item']}>
                    <label htmlFor='decription'>Short description</label>
                    <input type={'text'} id='description' placeholder='Description' className={errors.description ? `${styles['inputs-item-input']} ${styles.error}`: styles['inputs-item-input']}  {...register('description', { required: 'Please input your short description!' })} />
                    {errors.description ? <p className={styles.errorInfo}>{errors.description.message}</p> : null}
                </li>
                <li className={styles['inputs-item']}>
                    <label htmlFor='text'>Text</label>
                    <textarea id="text" placeholder="Text" className={errors.text ? `${styles['inputs-item-input']} ${styles.description} ${styles.error}`: `${styles['inputs-item-input']} ${styles.description}`} 
                        {...register('text', { required: 'Please input your text' })}/>
                    {errors.text ? <p className={styles.errorInfo}>{errors.text.message}</p> : null}
                </li>
            </ul>
            <label htmlFor="tags">Tags</label>
            <div className={styles['form__list-tags']}>
                <div className={styles['form__tags']}>
                {fields.map((item, index) => (
                    <div key={uuidv4()} className={styles['form__tagWithDelete']}>
                    <input
                        type={'text'}
                        placeholder="Tag"
                        className={styles['form__input']}
                        defaultValue={getValues(`tags.${index}`)}
                        {...register(`tags.${index}`)}
                    />
                    <button className={` ${styles['create-article__btn']} ${styles['form__delete']}`} type="button" onClick={() => remove(index)}>
                        Delete
                    </button>
                    </div>
                ))}
                </div>
                <button className={` ${styles['create-article__btn']} ${styles['form__add']}`} type="button" onClick={() => append('')}>
                Add tag
                </button>
            </div>
            <input className={` ${styles['create-article__btn']} ${styles['form__submit']}`} type="submit" value="Send" />
            </>
            
        )
    }
            
            </form>
        
    )
};

export default withClass(ArticleForm, styles.createArticle);