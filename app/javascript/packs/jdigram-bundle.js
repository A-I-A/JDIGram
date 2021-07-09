import ReactOnRails from 'react-on-rails';
import UserEdit from '../bundles/JDIgram/components/UserEdit';
const images = require.context('../images', true)

ReactOnRails.register({
  UserEdit,
});
