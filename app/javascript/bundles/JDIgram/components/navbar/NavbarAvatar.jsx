import React, { useState, useEffect } from 'react';
import userAvatarBlank from 'user_icon_glyph.svg'
import { connect } from 'react-redux';

const NavbarAvatar = props => {

  if (props.avatar) {
    return <img className="avatar avatar-micro" src={props.avatar}/>
  } else {
    return <img className="avatar avatar-micro" src={userAvatarBlank}/>
  }   
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar,
  }    
}

export default connect(mapStateToProps,{})(NavbarAvatar);
