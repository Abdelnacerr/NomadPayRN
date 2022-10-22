import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Identification: undefined;
  HomeScreen: undefined;
  UserType: undefined;
  FacePassport: undefined;
  VisionCamera: undefined;
};

export type RootStackNavProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};
