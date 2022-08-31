import {StyleSheet, Text, View} from 'react-native';
import {useGetUsersQuery} from '../RTK/services/getUsers';
import React, {FC} from 'react';
import {RootStackNavProps} from '../models/rootStackParamList';

interface HomeScrenProps {}
type Props = RootStackNavProps<'HomeScreen'> & HomeScrenProps;

const HomeScreen: FC<Props> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
    </View>
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
