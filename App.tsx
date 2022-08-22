import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Login from './src/Auth/Login';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={'#F5FFFA'} barStyle={'dark-content'} />
      <Login />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FFFA',
  },
});
