import React, { useState, useEffect } from 'react';
import userAvatarBlank from 'user_icon_glyph.svg'

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
    return <img className={`avatar ${size}`} src={props.avatar}/>
  } else {
    return <img className={`avatar ${size}`} src={userAvatarBlank}/>
  }

}

export default Avatar;

