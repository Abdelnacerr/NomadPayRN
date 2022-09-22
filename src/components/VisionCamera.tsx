import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import { Linking, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RootStackNavProps} from '../models/rootStackParamList';

interface VisionCameraProps {}

type Props = RootStackNavProps<'VisionCamera'> & VisionCameraProps;

const VisionCamera: FC<Props> = (): JSX.Element => {
  const devices = useCameraDevices();
  const device = devices.front;
  const cameraRef = useRef<Camera>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  console.log('photo path: ', photo);

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
    </>
  );
};

export default VisionCamera;

const styles = StyleSheet.create({});
