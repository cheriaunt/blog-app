// import {getAllArticles} from '../store/articlesReducer';
// import { getArticle } from '../store/articleReducer';

const apiBase = 'https://blog.kata.academy/api/';


export function fetchArticles(offset = 0) {
  return async function (dispatch) {
    try {
            const articlesRes = await fetch(`${apiBase}articles/?limit=5&offset=${offset}`)
            // , {
            //   method: 'GET',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     Authorization: `Token ${token}`,
            //   }})
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
            const token = localStorage.getItem('token');
            const articleRes = await fetch(`${apiBase}articles/${slug}`, {
              method: 'GET',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            })
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
      if (!userRes.ok) dispatch({ type: 'ERROR', payload: body.errors });
      dispatch(fetchSignIn(email, password));     
    } catch (e) {
      alert(e.message);
    }
  }
};
export function fetchGetUser(token) {
  return async function (dispatch) {
    try{
      const getUserRes = await fetch(`${apiBase}user`, {
        method: 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
      const body = await getUserRes.json();
      if (!getUserRes.ok) dispatch({ type: 'ERROR', payload: body.errors });
      dispatch({ type: 'GET_USER', payload: body.user});
    } catch (e) {
      alert(e.message);
    }
  }
};
export function fetchEditProfile(email, password, username, image, token) {
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
      alert(e.message);
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
      alert(e.message);
    }
  }
};
export function fetchEditArticle(title, description, body, token, slug, tagList) {
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
        const response = await res.json()
        if (!res.ok) {
          dispatch({ type: 'ERROR_ARTICLE', payload: response.errors })
          // dispatch({ type: 'EDIT', payload: null })
        } else {
          dispatch({ type: 'EDIT_ARTICLE', payload: response.article })
          // dispatch({ type: 'ERRCREATE', payload: null })
        }
    } catch (e) {
      alert(e.message);
    }
  }
};
export function fetchDeleteArticle(slug, token) {
  return async function (dispatch) {
    try{
      const userRes = await fetch(`${apiBase}articles/${slug}`,{
        method: 'DELETE',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
      const res = await userRes.json();
      if (!userRes.ok) {dispatch({ type: 'ERROR_ARTICLE', payload: res.errors });
      } else dispatch({ type: 'DELETE_ARTICLE', payload: 'ok'});     
    } catch (e) {
      console.log(e.message);
    }
  }
};