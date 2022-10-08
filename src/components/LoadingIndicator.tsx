import {ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      animating={true}
      color="#3A3F17"
      size={100}
      style={styles.activityIndicator}
    />
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
