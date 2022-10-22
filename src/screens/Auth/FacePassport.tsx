import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Linking} from 'react-native';
import {RootStackNavProps} from '../../models/rootStackParamList';
import Camera from 'react-native-vector-icons/Feather';
import Uplaod from 'react-native-vector-icons/Entypo';

interface FacePassportProps {}

type Props = RootStackNavProps<'FacePassport'> & FacePassportProps;

const FacePassport: FC<Props> = ({navigation}): JSX.Element => {
  const CameraIcon = () => <Camera name="camera" size={24} color="white" />;
  const UploadIcon = () => <Uplaod name="upload" size={24} color="white" />;

  const handleSubmit = async () => {
    navigation.navigate('VisionCamera');
  };

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
          buttonColor="#454B1B"
          textColor="#FFFFFF"
          icon={CameraIcon}
          onPress={() => {
            handleSubmit();
          }}>
          Camera
        </Button>
        <Button
          mode="contained"
          buttonColor="#454B1B"
          textColor="#FFFFFF"
          icon={UploadIcon}
          onPress={() => navigation.navigate('HomeScreen')}>
          Upload ID
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
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
    padding: 16,
    paddingTop: 0,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  buttonText: {
    color: '#212121',
  },
});
