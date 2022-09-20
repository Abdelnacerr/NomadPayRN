import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {Linking} from 'react-native';

const FacePassport = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.buttonText}>
        Take a picture!{' '}
      </Text>
      <Text variant="bodyMedium" style={styles.buttonText}>
        Or alternatively, upload your passport for verification
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="#FFFFFF"
          textColor="#212121"
          onPress={() => console.log('Pressed')}>
          Open Camera
        </Button>
        <Button
          mode="contained"
          buttonColor="#FFFFFF"
          textColor="#212121"
          onPress={() => console.log('Pressed')}>
          Upload Passport
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          bottom: '15%',
        }}>
        <Text variant="bodyMedium" style={styles.buttonText}>
          If this is not your first time logging in to this app, let us know{' '}
          <Text
            style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://google.com')}>
            here
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default FacePassport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    padding: 16,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 50,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
