import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {RootStackNavProps} from '../models/rootStackParamList';
import CameraIcon from 'react-native-vector-icons/Feather';
import {useGetS3UrlQuery} from '../RTK/services/getS3Url';
import {useIndexFacesMutation} from '../RTK/services/indexFaces';
interface VisionCameraProps {}

type Props = RootStackNavProps<'VisionCamera'> & VisionCameraProps;

const VisionCamera: FC<Props> = ({navigation}): JSX.Element => {
  const [indexFaces] = useIndexFacesMutation();
  const devices = useCameraDevices();
  const device = devices.front;
  const cameraRef = useRef<Camera>(null);
  const PhotoIcon = () => <CameraIcon name="camera" size={36} color="white" />;
  const [photo, setPhoto] = useState<PhotoFile>();
  const photoPath = `file://${photo?.path}`;
  const photoName = photoPath.split('/').pop()!;
  // console.log('bucket: ', Bucket);

  const requestCameraPermission = useCallback(async () => {
    const permissions = await Camera.requestCameraPermission();
    if (permissions === 'denied') await Linking.openSettings();
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const {data: signedUrl} = useGetS3UrlQuery(photoName);
  console.log('photoName', photoName);
  console.log('url:', signedUrl);

  const handleFileUpload = async () => {
    if (signedUrl && photo) {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: photoPath,
      });
      if (response.status === 200) {
        console.log('file uploaded');
      }
    } else {
      console.log('No file to upload');
    }
  };

  const handleIndexFaces = async () => {
    await handleFileUpload();
    try {
      indexFaces({
        Bucket: '',
        Name: photoName,
      })
        .unwrap()
        .then(res => {
          console.log('res', res);
        });
    } catch (error) {
      error;
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({});
        setPhoto(photo);
        handleFileUpload();
        handleIndexFaces();
      }
    } catch (error) {
      error;
    }
  }, [photoName, signedUrl]);

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
          onPress={handleSubmit}
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
