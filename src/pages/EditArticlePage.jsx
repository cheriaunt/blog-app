// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import ArticleForm from "../components/article-form/article-form";
// import EditArticle from "../components/edit-article/edit-article";


const EditArticlePage = () => {
  const Article = useSelector((state) => state.article.article);
  let defaultValues = {
    title: '',
    description: '',
    text: '',
    tags: [],
  };
  if (Article) {
        const { title,description, body, tagList } = Article;
        defaultValues = {
          title: title,
          description: description,
          text: body,
          tags: tagList,
        };
      }
  const title = 'Edit article';
  return (
    <>
      <ArticleForm title={title}  defaultValues={defaultValues}/>
    </> 
  );
}

export default EditArticlePage;