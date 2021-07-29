import React, { useState } from 'react';
import Cropper from 'react-cropper';


const AvatarCrop = props => {

  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob(function(blob){
        let formData = new FormData();
        formData.append('avatar', blob);
        props.changeUserAvatar(props.user_id, formData);
        props.hideModal();
      });
    }
  };

  return (
    <div className="modal fade" id="avatarCropModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Select miniature for your avatar
            </h5>
            <button className="btn-close" 
                    data-bs-dismiss="modal"
                    onClick={props.hideModal}/>
          </div>
          { props.startRender && 
            <div className="modal-body">
              <div className="container">
                <div className="row m-auto mb-3">
                  <div className="crop-image-container">
                    <Cropper
                      style={{width: "100%" }}
                      initialAspectRatio={1}
                      aspectRatio={1}
                      preview=".crop-preview"
                      src={props.image}
                      zoomable={false}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} 
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                  </div>
                  <div className="crop-preview-container" >
                    <div
                      className="crop-preview"
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <button className="btn btn-primary" onClick={getCropData}>
                    Send 
                  </button>
               </div>
              </div>
            </div>
          }
          </div>
        </div>
    </div>    
  )
}

export default AvatarCrop;
