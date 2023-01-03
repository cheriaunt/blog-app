import ArticlePage from "../../pages/ArticlePage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ArticlesWrapper = () => {
    const { name } = useParams();
    useEffect(() => {
      console.log({ name }); // <-- log param in effect
    }, [name]);
    return <ArticlePage userName={name} />;
  };

export default ArticlesWrapper;