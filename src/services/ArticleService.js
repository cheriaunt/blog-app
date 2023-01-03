import {getAllArticles} from '../store/articlesReducer';

const apiBase = 'https://blog.kata.academy/api/';


export function fetchArticles() {
  return async function (dispatch) {
    let newUrlArticles = new URL('articles', apiBase)
    let notLastPackOfArticles = true;
    try {
        while (notLastPackOfArticles) {
            const articlesRes = await fetch(newUrlArticles)
            if (articlesRes.status !== 200) continue
            const {articles, articlesCount} = await articlesRes.json()
            
            dispatch(getAllArticles(articles))
            if (articlesCount) notLastPackOfArticles = false
      }
    } catch (e) {
      alert(e.message)
    }
  }
}