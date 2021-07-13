import ReactOnRails from 'react-on-rails';
import UserEdit from '../bundles/JDIgram/components/UserEdit';
import Avatar from '../bundles/JDIgram/components/Avatar';
import AvatarInput from '../bundles/JDIgram/components/AvatarInput';
import AvatarCrop from '../bundles/JDIgram/components/AvatarCrop';
const images = require.context('../images', true)

ReactOnRails.register({
  UserEdit,
  AvatarInput,
  AvatarCrop,
  Avatar,
});
