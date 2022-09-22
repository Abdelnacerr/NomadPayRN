import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  HomeScreen: undefined;
  BottomSheet: undefined;
  FacePassport: undefined;
  VisionCamera: undefined;
};

export type RootStackNavProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};
