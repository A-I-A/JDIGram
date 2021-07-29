const SET_USER_AVATAR = 'SET_USER_AVATAR';
const REMOVE_USER_AVATAR = 'REMOVE_USER_AVATAR';
const SET_AVATAR_IS_LOADING = 'SET_AVATAR_IS_LOADING';
import ReactOnRails from 'react-on-rails';
const axios = require('axios');

let initialState = {
  avatar: '', 
  isAvatarLoading: false
}

export const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AVATAR : {
      return { ...state, avatar: action.avatar }
    }

    case REMOVE_USER_AVATAR : {
      return { ...state, avatar: false }
    }

    case SET_AVATAR_IS_LOADING : {
      return { ...state, isAvatarLoading: action.status }
    }

    default: return state;
  } 
}

export const setUserAvatar = (avatar) => {
  return { type : SET_USER_AVATAR, avatar: avatar }
}

export const removeUserAvatar = (userID) => {
  return dispatch => {
    axios.delete(
        `/users/${userID}/remove_avatar`,
        {data : {authenticity_token: ReactOnRails.authenticityToken()}}
    ).then(response => {
      if (response.status === 200) dispatch({type: REMOVE_USER_AVATAR})
    });
  }
}

export const changeUserAvatar = (userID, data) => {
  setAvatarIsLoading(true);
  return (dispatch) => {
    data.append('authenticity_token', ReactOnRails.authenticityToken());
    axios.post(
        `/users/${userID}/set_avatar`,
         data
    ).then(response => {
      if (response.status === 200) {
        dispatch(setUserAvatar(response.data.avatar_url));
        setAvatarIsLoading(false);
      }
    });
  }
}

export const setAvatarIsLoading = (status) => {
  return { type : SET_AVATAR_IS_LOADING, status: status }
}



