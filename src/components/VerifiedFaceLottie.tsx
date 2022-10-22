import React from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

const VerifiedFaceLottie = (): JSX.Element => {
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

export default VerifiedFaceLottie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
