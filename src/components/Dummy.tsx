import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';
import {RootStackNavProps} from '../models/rootStackParamList';

type Props = RootStackNavProps<'Dummy'>;

const Dummy: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../assets/lottie/facial-recognition.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Dummy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FFFA',
  },
});
