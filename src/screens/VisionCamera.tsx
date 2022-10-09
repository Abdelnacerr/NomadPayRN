import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Camera, PhotoFile, useCameraDevices} from 'react-native-vision-camera';
import {RootStackNavProps} from '../models/rootStackParamList';
import CameraIcon from 'react-native-vector-icons/Feather';
import {useGetS3UrlQuery} from '../RTK/services/getS3Url';
import {useIndexFacesMutation} from '../RTK/services/indexFaces';
import {useSearchFacesByImageMutation} from '../RTK/services/searchFacesByImage';
import NotiView from '../components/NotiView';
import LoadingIndicator from '../components/LoadingIndicator';
interface VisionCameraProps {}

type Props = RootStackNavProps<'VisionCamera'> & VisionCameraProps;

const VisionCamera: FC<Props> = ({navigation}): JSX.Element => {
  const [indexFaces, {isSuccess: isIndexingSuccess, isLoading}] =
    useIndexFacesMutation();
  const [
    searchFacesByImage,
    {isSuccess: isFaceSearchSuccess, isLoading: isFaceSearchLoading},
  ] = useSearchFacesByImageMutation();
  const devices = useCameraDevices();
  const device = devices.front;
  const cameraRef = useRef<Camera>(null);
  const PhotoIcon = () => <CameraIcon name="camera" size={36} color="white" />;
  const [photo, setPhoto] = useState<PhotoFile>();
  const photoPath = `file://${photo?.path}`;
  const photoName = photoPath.split('/').pop()!;
  const [showNotiView, setShowNotiView] = useState(false);
  const [NotiViewLabel, setNotiViewLabel] = useState<string>();

  const requestCameraPermission = useCallback(async () => {
    const permissions = await Camera.requestCameraPermission();
    if (permissions === 'denied') await Linking.openSettings();
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const {data: signedUrl} = useGetS3UrlQuery(photoName, {
    // skip: photoName === undefined,
  });

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
        setShowNotiView(showNotiView => !showNotiView);
        setNotiViewLabel('Image uploaded to s3');
      }
    } else {
      setNotiViewLabel('File not uploaded');
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
          setNotiViewLabel('Image indexed');
        });
    } catch (error) {
      error;
    }
  };

  const searchFaceByImage = async () => {
    await handleIndexFaces();
    try {
      searchFacesByImage({
        Bucket: 'testnpusersbucket',
        Name: photoName,
      }).then(res => {
        if (res) {
          setNotiViewLabel('Face Matched successfully');
        } else {
          setNotiViewLabel('No Face Matches exist!');
        }
      });
    } catch (error) {
      error;
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({
          enableAutoDistortionCorrection: true,
          enableAutoRedEyeReduction: true,
          enableAutoStabilization: true,
        });

        setPhoto(photo);
        await handleFileUpload();
        await handleIndexFaces();
        await searchFaceByImage();
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
      <View style={styles.container}>
        <IconButton
          style={styles.icon}
          icon={PhotoIcon}
          onPress={handleSubmit}
        />
      </View>
      {showNotiView && <NotiView uri={photoPath} label={NotiViewLabel} />}
      {isLoading && isFaceSearchLoading && <LoadingIndicator />}
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
