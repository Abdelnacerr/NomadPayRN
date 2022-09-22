import React, {FC, useCallback, useEffect, useRef} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RootStackNavProps} from '../models/rootStackParamList';
import Cameraicon from 'react-native-vector-icons/Feather';
interface VisionCameraProps {}

type Props = RootStackNavProps<'VisionCamera'> & VisionCameraProps;

const VisionCamera: FC<Props> = (): JSX.Element => {
  const devices = useCameraDevices();
  const device = devices.front;
  const cameraRef = useRef<Camera>(null);
  const PhotoIcon = () => <Cameraicon name="camera" size={36} color="white" />;

  const requestCameraPermission = useCallback(async () => {
    const permissions = await Camera.requestCameraPermission();
    if (permissions === 'denied') await Linking.openSettings();
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (device == null) return <></>;

  return (
    <>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        zoom={1}
        enableHighQualityPhotos={true}
        accessible={true}
        format={device.formats[0]}
      />
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          icon={PhotoIcon}
          onPress={() => {
            cameraRef.current?.takePhoto();
            console.log('photo taken');
          }}
        />
      </View>
    </>
  );
};

export default VisionCamera;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 20,
  },
  icon: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#454B1B',
  },
});
