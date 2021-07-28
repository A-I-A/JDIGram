import React from 'react';
import AvatarInput from '../AvatarInput';
import { Provider } from 'react-redux';
import store from '../../store/store'

const UserShowAvatarContainer = (props) => {
  return (
    <Provider store={store}>
      <AvatarInput user_id={props.user_id} 
                   token={props.token} 
                   action={props.action} />
    </Provider>
  )
}

export default UserShowAvatarContainer;
