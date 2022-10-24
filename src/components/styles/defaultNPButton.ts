import {StyleSheet, Dimensions} from 'react-native';
import alignment from './alignment';

const styles = StyleSheet.create({
  primaryButton: {
    width: Dimensions.get('window').width / 2,
    backgroundColor: '#A2A58D',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    ...alignment,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
});

export {styles};
