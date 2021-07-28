import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Avatar from '../Avatar';

const NavbarAvatarContainer = (props) => {

  return (
    <Provider store={store}>
        <Avatar size={'micro'} />
    </Provider>
  )
}

export default NavbarAvatarContainer;
