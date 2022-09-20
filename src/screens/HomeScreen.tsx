import React, {FC, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {RootStackNavProps} from '../models/rootStackParamList';
import FacePassport from './Auth/FacePassport';

interface HomeScreenProps {}

type Props = RootStackNavProps<'HomeScreen'> & HomeScreenProps;

const HomeScreen: FC<Props> = ({navigation}): JSX.Element => {
  const sheetRef = useRef<BottomSheetBehavior>(null);

  useEffect(() => {
    sheetRef.current?.snapTo(0);
  }, []);

  return (
    <>
      <View style={styles.container}></View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={['40%', 300, 0]}
        borderRadius={16}
        renderContent={FacePassport}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FFFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
