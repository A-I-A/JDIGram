import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import AvatarCropModal from './AvatarCropModal';
import { connect } from 'react-redux';
import { changeUserAvatar } from '../store/avatarReducer'


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
       props.action === 'show' ?
       'user-avatar-container' 
       : 
       'edit-avatar-container'
       }>
    <label htmlFor="user_avatar">
      <Avatar size={props.action === 'show' ? 'big' : 'small'} />
     </label>
     <input id="user_avatar" 
            className="avatar-file-field" 
            type="file" 
            accept="image/*"
            onInput={handleInput}/>
     <AvatarCropModal image={image} 
                      startRender={startRender}
                      user_id={props.user_id}
                      hideModal={hideModal}
                      changeUserAvatar={props.changeUserAvatar} />
   </div>
  )    
}

const mapStateToProps = state => {
  return {avatar: state.avatar}
}

export default connect (mapStateToProps,{changeUserAvatar})(AvatarInput);
