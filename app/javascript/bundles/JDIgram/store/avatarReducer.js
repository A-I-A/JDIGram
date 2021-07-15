const SET_USER_AVATAR = 'SET_USER_AVATAR'
const REMOVE_USER_AVATAR = 'REMOVE_USER_AVATAR'

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

    default: return state;
  } 
}

export const setUserAvatar = (avatar) => {
  return { type : SET_USER_AVATAR, avatar: avatar }
}

export const removeUserAvatar = () => {
  return { type : REMOVE_USER_AVATAR }
}
