import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNPModal from '../components/Modal';
import {RootStackNavProps} from '../models/rootStackParamList';
import FacePassport from './Auth/FacePassport';

interface IdentificationProps {}

type Props = RootStackNavProps<'Identification'> & IdentificationProps;

const Identification: FC<Props> = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(true);
  const navigation = useNavigation();

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  return (
    <>
      <View style={styles.container}>
        <RNPModal
          children={<FacePassport navigation={navigation as any} />}
          visible={visible}
          hideModal={hideModal}
          showModal={showModal}
        />
      </View>
    </>
  );
};

export default Identification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
