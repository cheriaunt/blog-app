// import {getAllArticles} from '../store/articlesReducer';
// import { getArticle } from '../store/articleReducer';

import { getToken } from "../utils/getToken";

const apiBase = 'https://blog.kata.academy/api/';


export function fetchArticles(offset = 0) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem('token');
      const articlesRes = await fetch(`${apiBase}articles/?limit=5&offset=${offset}`, {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      if (!articlesRes.ok) throw new Error(`error fetch URL  ${articlesRes.status}`);
      const body = await articlesRes.json();
      dispatch({ type: 'GET_ALL_ARTICLES', payload: body.articles, articlesCount: body.articlesCount });
    } catch (e) {
      console.log(e.message);
    }
  }
};

export function fetchArticle(slug) {
  return async function (dispatch) {
    try{
      const token = getToken();
      const articleRes = await fetch(`${apiBase}articles/${slug}`, {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      if (!articleRes.ok) throw new Error(`error fetch URL articles/{slug} ${articleRes.status}`);
      const body = await articleRes.json();
      dispatch({ type: 'GET_ARTICLE', payload: body.article });
    } catch (e) {
      console.log(e.message);
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
      if (userRes.ok) {
        dispatch({ type: 'LOG_IN', payload: body.user });
        localStorage.setItem('token', body.user.token);
        localStorage.setItem('username', body.user.username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } else{
        dispatch({ type: 'ERROR', payload: body.errors });        
      }
    } catch (e) {
      console.log(e.message);
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
      if (!userRes.ok) dispatch({ type: 'ERROR', payload: body.errors });
      dispatch(fetchSignIn(email, password));     
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchGetUser(token) {
  return async function (dispatch) {
    try{
      const getUserRes = await fetch(`${apiBase}user`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        });
      const body = await getUserRes.json();
      if (!getUserRes.ok) dispatch({ type: 'ERROR', payload: body.errors });
      dispatch({ type: 'GET_USER', payload: body.user});
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchEditProfile(email, password = '', username, image = '', token) {
  return async function (dispatch) {
    try{
      const userRes = await fetch(`${apiBase}user`, {
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
      if (userRes.ok) {
      dispatch({ type: 'EDIT_PROFILE', payload: body.user });
      localStorage.setItem('token', body.user.token);
      localStorage.setItem('username', body.user.username);
      localStorage.setItem('email', body.user.email);
      localStorage.setItem('password', password);
      localStorage.setItem('image', body.user.image);
      } else {dispatch({ type: 'ERROR', payload: body.errors });}
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchCreateArticle(title, description, body, tagList, token) {
  return async function (dispatch) {
    try{
      const userRes = await fetch(`${apiBase}articles`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList : tagList,
          },
        }),
      });
      const res = await userRes.json();
      if (!userRes.ok) {dispatch({ type: 'ERROR_ARTICLE', payload: res.errors });
      } else dispatch({ type: 'CREATE_ARTICLE', payload: res.article});     
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchEditArticle(title, description, body, tagList, token, slug) {
  return async function (dispatch) {
    try{
        const res = await fetch(`${apiBase}articles/${slug}`, {
          method: 'PUT',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            article: {
              title: title,
              description: description,
              body: body,
              tagList: tagList,
            },
          }),
        })
        const response = await res.json();
        if (!res.ok) {
          dispatch({ type: 'ERROR_ARTICLE', payload: response.errors });
        } else {
          dispatch({ type: 'EDIT_ARTICLE', payload: response.article });
        }
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchDeleteArticle(slug) {
  return async function (dispatch) {
    try{
      const token = getToken();
      const userRes = await fetch(`${apiBase}articles/${slug}`,{
        method: 'DELETE',
        headers:  { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      
      if (!userRes.ok) {
        const res = await userRes.json();
        dispatch({ type: 'ERROR_ARTICLE', payload: res.errors });
      } else dispatch({ type: 'DELETE_ARTICLE', payload: 'ok'});     
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchFavoriteAnArticle (slug) {
  return async function (dispatch) {
    try{
      const token = getToken();
      const res = await fetch(`${apiBase}articles/${slug}/favorite`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      const body = await res.json();
      if (res.ok) {
        dispatch({ type: 'GET_ARTICLE', payload: body.article });
      }
    } catch (e) {
      console.log(e.message);
    }
  }
};
export function fetchUnFavoriteAnArticle (slug) {
  return async function (dispatch) {
    try{
      const token = getToken();
      const res = await fetch(`${apiBase}articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      const body = await res.json()
      if (res.ok) {
        dispatch({ type: 'GET_ARTICLE', payload: body.article })
      }
    } catch (e) {
      console.log(e.message);
    }
  }
};