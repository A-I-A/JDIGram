import ReactOnRails from 'react-on-rails';
import UserEdit from '../bundles/JDIgram/components/UserEdit';
import Avatar from '../bundles/JDIgram/components/Avatar';
import AvatarInput from '../bundles/JDIgram/components/AvatarInput';
import AvatarCropModal from '../bundles/JDIgram/components/AvatarCropModal';
const images = require.context('../images', true)
//import 'bootstrap';
//import * as bootstrap from 'bootstrap'

ReactOnRails.register({
  UserEdit,
  AvatarInput,
  AvatarCropModal,
  Avatar,
});
