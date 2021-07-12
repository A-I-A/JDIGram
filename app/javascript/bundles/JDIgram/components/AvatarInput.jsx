import React, { useState } from 'react';
const axios = require('axios');
import userAvatarBlank from 'user_icon_glyph.svg'
import spinner from 'spinner.svg'
import AvatarCrop from './AvatarCrop'

const AvatarInput = props => {

  const [avatar, setAvatar] = useState(props.avatar);
  const [image, setImg] = useState(false);
  const [startRender, setStart] = useState(false);

  const handleInput = e => {
    let modal = new bootstrap.Modal(document.querySelector("#myModal"));
    modal.toggle();
    let reader = new FileReader();  
      reader.onloadend = (event) => {
       setImg(event.target.result);
       setTimeout(()=>{setStart(true);},500)
      }
    reader.readAsDataURL(e.target.files[0]);
  }
  
  return (
   <div>
    <label className={`${props.action}-avatar-container`} htmlFor="user_avatar">
      {avatar ?
        <img className={`${props.action}-avatar avatar`} src={avatar}/>
        :
        <img className={`${props.action}-avatar avatar`} src={userAvatarBlank}/>
       }
     </label>
     <input id="user_avatar" 
         className="avatar-file-field" 
         type="file" 
         accept="image/*"
         onInput={handleInput}/>
     <AvatarCrop image={image} 
                 startRender={startRender} 
                 token={props.token}
                 user_id={props.user_id}/>
   </div>
  )    
}

export default AvatarInput;
