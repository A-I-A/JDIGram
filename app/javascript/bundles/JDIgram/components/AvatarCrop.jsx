import React, { useState, useEffect, useRef } from 'react';
import Cropper from "react-cropper";
const axios = require('axios');

const AvatarCrop = props => {

  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toBlob(function(blob){
        let formData = new FormData();
        formData.append('avatar', blob);
        formData.append('authenticity_token', props.token)
        axios.post(
          `/users/${props.user_id}/set_avatar`,
           formData
        ).then(response => {
          if (response.status == 200) {
            console.log("success")
          }
        }) 
      }));
    }
  };

  return (
    <div className="modal fade" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Select miniature for your avatar
            </h5>
            <button className="btn-close" data-bs-dismiss="modal"/>
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
