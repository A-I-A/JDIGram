import React from 'react';
const axios = require('axios');
import { connect } from 'react-redux';
import { removeUserAvatar } from '../../store/avatarReducer'


const RemoveAvatarButton = props => {

  const removeAvatar = () => {
    axios.delete(`/users/${props.user_id}/remove_avatar`,
      {data: {authenticity_token: props.token}}
    ).then(response => {
      if (response.status == 200) {
        props.removeUserAvatar();
      }  
    });
  }

  if (props.avatar) {
    return (
    <button className="remove_avatar-button" onClick={removeAvatar}>
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
