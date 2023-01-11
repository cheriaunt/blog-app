import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import withClass from "../../hoc/withClass";
import { fetchCreateArticle } from "../../services/BlogService";
import { v4 as uuidv4 } from 'uuid';

import styles from '../article-form/article-form.module.scss';
import ArticleForm from "../article-form";

const EditArticle = () => {
    const user = useSelector((state) => state.user.user);
    const userArticle = useSelector((state) => state.article.user);
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
    dispatch(fetchCreateArticle(title,description, text, tags, token));
      navigate(`/article/${userArticle.slug}`);
    
  };
    
    let defaultValues = {
        title: '',
        description: '',
        text: '',
        tags: [],
      };
      if (userArticle) {
        const { article } = userArticle;
        defaultValues = {
          title: article.title,
          description: article.description,
          text: article.body,
          tags: article.tagList,
        };
      }
    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { dirtyFields, errors },
    } = useForm({ mode: 'onBlur', defaultValues,
    });
    const serverErrors = useSelector((state) => state.user.errors);
    console.log(user, 'user');
    console.log(serverErrors, 'serverErrors' );
    const { fields, remove, append } = useFieldArray({
        name: 'tags',
        control,
      });
    // const content = (!user)? (<Navigate to="/sign-up" replace />): ()
        
    
    return (
        <ArticleForm />
    )
};

export default EditArticle;