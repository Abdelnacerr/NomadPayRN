import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Identification: undefined;
  AccountType: undefined;
  AccountTypeCard: undefined;
  Login: {accountTypeId: number};
  FacePassport: undefined;
  VisionCamera: undefined;
};

export type RootStackNavProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};
