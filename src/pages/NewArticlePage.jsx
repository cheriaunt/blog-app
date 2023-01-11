import ArticleForm from "../components/article-form";


const CreateArticlePage = () => {
  const title = 'Create new article';
  let defaultValues = {
    title: '',
    description: '',
    text: '',
    tags: [],
  };
  return (
    <>
      <ArticleForm title={title} defaultValues={defaultValues}/>
    </> 
  );
}

export default CreateArticlePage;