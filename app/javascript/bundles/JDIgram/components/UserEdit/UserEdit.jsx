import PropTypes from 'prop-types';
import React from 'react';
import AvatarInput from '../AvatarInput';
import RemoveAvatarButton from './RemoveAvatarButton';
import UserEditForm from './UserEditForm';
import { Provider } from 'react-redux';
import store from '../../store/store'


const UserEdit = (props) => {

  return (
    <Provider store={store}>
      <div className="edit-container">
        <div className="edit-sidebar">
        </div>
        <div className="edit-credentials">
          <div className="edit-title-row">
            <AvatarInput action={'edit'} 
                         user_id={props.user_id}
            />
            <div className="col">
              <div className="text-start mb-1">{props.login}</div>
              <RemoveAvatarButton user_id={props.user_id} />
            </div>
          </div>
          <UserEditForm name={props.name}
                        login={props.login} 
                        email={props.email}
                        web_page={props.web_page}
                        phone={props.phone}
                        about_me={props.about_me}
                        gender={props.gender}
                        user_id={props.user_id}
                        token={props.token}/>
        </div>
      </div>
    </Provider>
  );
};

UserEdit.propTypes = {
  name: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  web_page: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  about_me: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
};

export default UserEdit;
