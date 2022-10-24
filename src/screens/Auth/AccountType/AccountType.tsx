import React, {FC} from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Text} from 'react-native-paper';
import {RootStackNavProps} from '../../../models/rootStackParamList';
import AccountTypeCard from './AccountTypeCard';
import {colors, PAGE_HEIGHT, PAGE_WIDTH} from '../../../utils/config';

interface AccountTypeProps {}
type Props = RootStackNavProps<'AccountType'> & AccountTypeProps;

const AccountType: FC<Props> = ({navigation}): JSX.Element => {
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  } as const;

  return (
    <View style={{flex: 1}}>
      <Text
        variant="displayLarge"
        style={{
          color: '#454B1B',
          alignSelf: 'center',
          marginHorizontal: 14,
          marginTop: 20,
        }}>
        {' '}
        Select Account Type
      </Text>
      <Carousel
        {...baseOptions}
        loop
        withAnimation={{
          type: 'spring',
          config: {
            damping: 13,
          },
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
        }}
        autoPlayInterval={1500}
        data={colors}
        renderItem={({index, animationValue}) => (
          <AccountTypeCard
            animationValue={animationValue}
            key={index}
            index={index}
            navigation={navigation as any}
          />
        )}
      />
    </View>
  );
};

export default AccountType;
