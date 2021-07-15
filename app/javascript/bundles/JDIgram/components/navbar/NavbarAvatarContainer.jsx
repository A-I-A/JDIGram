import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import NavbarAvatar from './NavbarAvatar';

const NavbarAvatarContainer = (props) => {

  return (
    <Provider store={store}>
      <NavbarAvatar/>
    </Provider>
  )
}

export default NavbarAvatarContainer;
