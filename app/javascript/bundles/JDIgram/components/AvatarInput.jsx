import React, { useState } from 'react';
import Avatar from './Avatar'
import AvatarCrop from './AvatarCrop'

const AvatarInput = props => {

  const [image, setImg] = useState(false);
  const [startRender, setStartRender] = useState(false);

  const handleInput = e => {
    let modal = new bootstrap.Modal(document.querySelector("#myModal"));
    modal.toggle();
    let reader = new FileReader();  
      reader.onloadend = (event) => {
       setImg(event.target.result);
       setTimeout(()=>{setStartRender(true);},500)
      }
    reader.readAsDataURL(e.target.files[0]);
  }
  
  return (
   <div style={{textAlign: 'center'}} className="offset-lg-3">
    <label className={`${props.action}-avatar-container`} htmlFor="user_avatar">
      <Avatar avatar={props.avatar} size={props.action == 'show' ? 'big' : 'small'} />
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
