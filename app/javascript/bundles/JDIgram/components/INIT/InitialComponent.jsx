import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserAvatar } from '../../store/avatarReducer'

const InitialComponent = props => {
  
  useEffect(() => {
    props.setUserAvatar(props.avatar);
  });

  return  <div/>   
}

export default connect(null,{ setUserAvatar })(InitialComponent);
