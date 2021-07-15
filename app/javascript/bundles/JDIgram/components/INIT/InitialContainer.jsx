import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import InitialComponent from './InitialComponent';

const InitialContainer = (props) => {
  return (
    <Provider store={store}>
      <InitialComponent avatar={props.avatar}/>
    </Provider>
  )
}

export default InitialContainer;
