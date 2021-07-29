import React from 'react';
const axios = require('axios');
import { connect } from 'react-redux';
import { removeUserAvatar } from '../../store/avatarReducer'


const RemoveAvatarButton = props => {

  if (props.avatar) {
    return (
    <button
        className="remove_avatar-button"
        onClick={() => {props.removeUserAvatar(props.user_id)}}
    >
      Remove avatar
    </button>
    )
  } else {
    return null
  }
  
}

const mapStateToProps = state => {
  return { avatar: state.avatar }
}

export default connect(mapStateToProps,{removeUserAvatar})(RemoveAvatarButton);
