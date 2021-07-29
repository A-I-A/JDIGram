import React, { useState, useEffect } from 'react';
import userAvatarBlank from 'user_icon_glyph.svg';
import spinner from 'spinner.svg';
import {connect} from "react-redux";

const Avatar = props => {
  
  const [size, setSize] = useState();

  useEffect(() => {
    switch (props.size) {
    case 'big' :  setSize('avatar-big');
                  break;
    case 'small' : setSize('avatar-small');  
                   break;
    case 'micro' : setSize('avatar-micro');  
                   break;
    }
  });

  if (props.isAvatarLoading) {
    return <img className={`avatar ${size} `} src={spinner}/>
  } else {
    if (props.avatar){
      return <img className={`avatar ${size} avatar-current-user`} src={props.avatar}/>
    } else {
      return <img className={`avatar ${size} avatar-current-user`} src={userAvatarBlank}/>
   }
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar,
    isAvatarLoading: state.isAvatarLoading,
  }
}

export default connect(mapStateToProps,{})(Avatar);

