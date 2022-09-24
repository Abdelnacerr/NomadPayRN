import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {RootStackNavProps} from '../models/rootStackParamList';
import Cameraicon from 'react-native-vector-icons/Feather';
import {useGetS3UrlQuery} from '../RTK/services/getS3Url';

interface VisionCameraProps {}

type Props = RootStackNavProps<'VisionCamera'> & VisionCameraProps;

const VisionCamera: FC<Props> = ({navigation}): JSX.Element => {
  const devices = useCameraDevices();
  const device = devices.front;
  const cameraRef = useRef<Camera>(null);
  const PhotoIcon = () => <Cameraicon name="camera" size={36} color="white" />;
  const [photo, setPhoto] = useState<PhotoFile>();
  const photoPath = `file://${photo?.path}`;
  const photoName = photoPath.split('/').pop()!;
  const photoType = 'image/jpg';

  const requestCameraPermission = useCallback(async () => {
    const permissions = await Camera.requestCameraPermission();
    if (permissions === 'denied') await Linking.openSettings();
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const capturePhoto = useCallback(async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto();
        if (photo) {
          setPhoto(photo);
        }
      }
    } catch (error) {
      error;
    }
  }, []);

  if (photoName!!) {
    const {data} = useGetS3UrlQuery(photoName);
  }

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
      <Image style={styles.image} source={{uri: photoPath}} />
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          icon={PhotoIcon}
          onPress={() => capturePhoto()}
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
  image: {
    width: 66,
    height: 60,
  },
});
