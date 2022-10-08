import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Text} from 'react-native-paper';

interface NotiViewProps {
  label: string | undefined;
  uri: string;
}

const NotiView: FC<NotiViewProps> = ({uri, label}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri}} />
      <Text variant="headlineMedium" style={styles.text}>
        {label}
      </Text>
    </View>
  );
};

export default NotiView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 5,
    height: 80,
    width: '90%',
    backgroundColor: '#838767',
    position: 'absolute',
    alignItems: 'flex-start',
    flexDirection: 'row',
    left: '5%',
    borderRadius: 16,
  },
  text: {
    color: '#FFFFFF',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 5,
  },
});
