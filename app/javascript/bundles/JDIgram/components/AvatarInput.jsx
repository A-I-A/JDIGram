import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import AvatarCropModal from './AvatarCropModal';

const AvatarInput = props => {

  const [image, setImage] = useState(false);
  const [startRender, setStartRender] = useState(false);
  const [modal, setModal] = useState(null);
  
  useEffect(() => {
    setModal(
       new bootstrap.Modal(document.querySelector("#avatarCropModal")));
  }, []);

  const handleInput = e => {
    let reader = new FileReader();  
      reader.onloadend = (event) => {
       setImage(event.target.result);
      }
    reader.readAsDataURL(e.target.files[0]);
    showModal();
  }

  const updateAvatar = (avatar) => {
    props.addAvatar(avatar);
    hideModal();
  }

  const showModal = () => {
    modal.show();
    setTimeout(()=>{setStartRender(true);},500)
  }

  const hideModal = () => {
    modal.hide();
    setStartRender(false);
    setImage(false);
  }
  
  return (
   <div className={
       props.action == 'show' ? 
       'user-avatar-container' 
       : 
       'edit-avatar-container'
       }>
    <label htmlFor="user_avatar">
      <Avatar avatar={props.avatar} size={props.action == 'show' ? 'big' : 'small'} />
     </label>
     <input id="user_avatar" 
            className="avatar-file-field" 
            type="file" 
            accept="image/*"
            onInput={handleInput}/>
     <AvatarCropModal image={image} 
                 startRender={startRender} 
                 token={props.token}
                 user_id={props.user_id}
                 updateAvatar={updateAvatar}
                 hideModal={hideModal}/>
   </div>
  )    
}

export default AvatarInput;
