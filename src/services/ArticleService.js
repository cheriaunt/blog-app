import {getAllArticles} from '../store/articlesReducer';
// import { getArticle } from '../store/articleReducer';

const apiBase = 'https://blog.kata.academy/api/';


export function fetchArticles() {
  return async function (dispatch) {
    let newUrlArticles = new URL('articles', apiBase)
    let notLastPackOfArticles = true;
    try {
        while (notLastPackOfArticles) {
            const articlesRes = await fetch(newUrlArticles)
            if (articlesRes.status !== 200) continue
            const {articles, articlesCount} = await articlesRes.json();
            
            dispatch(getAllArticles(articles));
            if (articlesCount) notLastPackOfArticles = false;
      }
    } catch (e) {
      alert(e.message)
    }
  }
}

export function fetchArticle(slug) {
    return async  function (dispatch) {
        try{
            const articleRes = await fetch(`${apiBase}articles/${slug}`);
            if (!articleRes.ok) throw new Error(`error fetch URL slug ${articleRes.status}`);
            const body = await articleRes.json();
            dispatch({ type: 'GET_ARTICLE', payload: body.article });
        } catch (e) {
            alert(e.message)
          }
        }
          
}
