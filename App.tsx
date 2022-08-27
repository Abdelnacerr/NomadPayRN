import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/RTK/store/store';
import Login from './src/screens/Auth/Login';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor={'#F5FFFA'} barStyle={'dark-content'} />
        <Login />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FFFA',
  },
});
