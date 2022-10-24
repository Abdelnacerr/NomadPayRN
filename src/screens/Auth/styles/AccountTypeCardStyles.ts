import {StyleSheet} from 'react-native';
import alignment from '../../../components/styles/alignment';

const AccountTypeCardStyles = StyleSheet.create({
  lottie: {
    borderRadius: 16,
    position: 'absolute',
    zIndex: 999,
    ...alignment,
  },
});

export default AccountTypeCardStyles;
