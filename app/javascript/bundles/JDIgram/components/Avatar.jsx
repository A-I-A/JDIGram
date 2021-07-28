import React, { useState, useEffect } from 'react';
import userAvatarBlank from 'user_icon_glyph.svg'
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

  if (props.avatar){
    return <img className={`avatar ${size} avatar-current-user`} src={props.avatar}/>
  } else {
    return <img className={`avatar ${size} avatar-current-user`} src={userAvatarBlank}/>
  }
}

const mapStateToProps = state => {
  return {
    avatar: state.avatar,
  }
}

export default connect(mapStateToProps,{})(Avatar);

