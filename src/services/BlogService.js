// import {getAllArticles} from '../store/articlesReducer';
// import { getArticle } from '../store/articleReducer';

const apiBase = 'https://blog.kata.academy/api/';


export function fetchArticles(offset = 0) {
  return async function (dispatch) {
    try {
            const articlesRes = await fetch(`${apiBase}articles/?limit=5&offset=${offset}`)
            if (!articlesRes.ok) throw new Error(`error fetch URL  ${articlesRes.status}`);
            const body = await articlesRes.json();
            dispatch({ type: 'GET_ALL_ARTICLES', payload: body.articles, articlesCount: body.articlesCount });
    } catch (e) {
      alert(e.message)
    }
  }
};

export function fetchArticle(slug) {
    return async function (dispatch) {
        try{
            const articleRes = await fetch(`${apiBase}articles/${slug}`);
            if (!articleRes.ok) throw new Error(`error fetch URL articles/{slug} ${articleRes.status}`);
            const body = await articleRes.json();
            dispatch({ type: 'GET_ARTICLE', payload: body.article });
        } catch (e) {
            alert(e.message)
          }
        }
          
};
export function fetchSignIn(email, password) {
  return async function (dispatch) {
    try{
      const userRes = await fetch(`${apiBase}users/login`, {
        method: 'POST',
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
        headers: { 'content-type': 'application/json' },
      });
      const body = await userRes.json();
      if (!userRes.ok) dispatch({ type: 'ERROR_LOG_IN', payload: body });
      dispatch({ type: 'LOG_IN', payload: body.user });
      // localStorage.setItem('token', body.user.token);
      // localStorage.setItem('username', body.user.username);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      
    } catch (e) {
      alert(e.message);
    }
  }
};
export function fetchSignUp(username, email, password) {
  return async function (dispatch) {
    try{
      const userRes = await fetch(`${apiBase}users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
          },
        }),
      });
      const body = await userRes.json();
      if (!userRes.ok) dispatch({ type: 'ERROR_LOG_IN', payload: body });
      dispatch(fetchSignIn(email, password));
      // localStorage.setItem('token', body.user.token);
      // localStorage.setItem('username', body.user.username);      
    } catch (e) {
      alert(e.message);
    }
  }
};
export function fetchGetUser(token) {
  return async function (dispatch) {
    try{
      const getUserRes = await fetch(`${apiBase}user`, {
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
      if (!getUserRes.ok) throw new Error(`error fetch URL user ${getUserRes.status}`);
      const body = await getUserRes.json();
      dispatch({ type: 'GET_USER', payload: body.user});
    } catch (e) {
      alert(e.message);
    }
  }
};
export function fetchEditProfile(email, password, username, image, token) {
  return async function (dispatch) {
    try{
      const userRes = await fetch(`${apiBase}users/login`, {
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            username : username,
            image: image,
          },
        }),
      });
      const body = await userRes.json();
      if (!userRes.ok) dispatch({ type: 'ERROR_EDIT_PROFILE', payload: body });
      dispatch({ type: 'EDIT_PROFILE', payload: body.user });
      localStorage.setItem('token', body.user.token);
      localStorage.setItem('username', body.user.username);
      localStorage.setItem('email', body.user.email);
      localStorage.setItem('password', password);
      localStorage.setItem('image', body.user.image);
    } catch (e) {
      alert(e.message);
    }
  }
};
