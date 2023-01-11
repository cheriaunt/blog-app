import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/article-form";
import { fetchCreateArticle } from "../services/BlogService";
import { getToken } from "../utils/getToken";


const CreateArticlePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onCreate, setCreate] = useState(false);
  const Article = useSelector((state) => state.article.article);
  const title = 'Create new article';
  let defaultValues = {
    title: '',
    description: '',
    text: '',
    tags: [],
  };
  const formSubmit = (data) => {
    const { description, text, title, tags } = data;
    
    const token = getToken();
    dispatch(fetchCreateArticle(title, description, text, tags, token));
    setCreate(true);
    };
  useEffect(() => {
        if (onCreate === true && Article) {
            setCreate(false);
            navigate(`/article/${Article.slug}`);
        }
  }, [Article])
  return (
    <>
      <ArticleForm title={title} defaultValues={defaultValues} formSubmit={formSubmit}/>
    </> 
  );
}

export default CreateArticlePage;