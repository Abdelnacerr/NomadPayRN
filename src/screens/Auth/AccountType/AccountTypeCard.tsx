import React, {FC} from 'react';
import Lottie from 'lottie-react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {withAnchorPoint} from '../../../utils/anchorPoint';
import {accountLotties} from '../../../utils/items';
import {Text} from 'react-native-paper';
import {useGetaccountTypeQuery} from '../../../RTK/services/getAccountTypes';
import {styles} from '../../../components/styles/defaultNPButton';
import NPButton from '../../../components/NPButton';
import AccountTypeCardStyles from '../styles/AccountTypeCardStyles';
import {colors, PAGE_HEIGHT, PAGE_WIDTH} from '../../../utils/config';
import {RootStackNavProps} from '../../../models/rootStackParamList';

interface AccountTypeCardProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
}
type Props = RootStackNavProps<'AccountTypeCard'> & AccountTypeCardProps;

const AccountTypeCard: FC<Props> = ({
  navigation,
  index,
  animationValue,
}): JSX.Element => {
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;
  const {data} = useGetaccountTypeQuery();
  const accountType = data
    ?.map(accountType => accountType.type)
    .map(type => type)
    .slice(1);
  const accountTypeId = data?.map(accountType => accountType.id).slice(1);

  const cardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-0.1, 0, 1],
      [0.95, 1, 1],
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      animationValue.value,
      [-1, -0.2, 0, 1],
      [0, WIDTH * 0.3, 0, 0],
    );

    const transform = {
      transform: [
        {scale},
        {translateX},
        {perspective: 200},
        {
          rotateY: `${interpolate(
            animationValue.value,
            [-1, 0, 0.4, 1],
            [30, 0, -25, -25],
            Extrapolate.CLAMP,
          )}deg`,
        },
      ],
    };

    return {
      ...withAnchorPoint(
        transform,
        {x: 0.5, y: 0.5},
        {width: WIDTH, height: HEIGHT},
      ),
    };
  }, [index]);

  const blockStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, 60, 60],
    );

    const translateY = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0, -40, -40],
    );

    const rotateZ = interpolate(animationValue.value, [-1, 0, 1], [0, 0, -25]);

    return {
      transform: [{translateX}, {translateY}, {rotateZ: `${rotateZ}deg`}],
    };
  }, [index]);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View
        style={[
          {
            backgroundColor: colors[index],
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            width: WIDTH,
            height: HEIGHT * 0.8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,
            elevation: 16,
          },
          cardStyle,
        ]}>
        {accountType && (
          <Text variant="displayLarge" style={{flex: 1, color: '#FFF'}}>
            {accountType[index].charAt(0).toUpperCase() +
              accountType[index].slice(1)}
          </Text>
        )}
        {accountTypeId && (
          <NPButton
            style={styles.primaryButton}
            onPress={() => {
              navigation.navigate('Login', {
                accountTypeId: accountTypeId[index],
              });
            }}>
            <Text variant="titleLarge" style={styles.primaryButtonText}>
              Select
            </Text>
          </NPButton>
        )}
      </Animated.View>
      <Lottie
        source={accountLotties[index % 3]}
        autoPlay
        loop
        style={[
          {
            width: WIDTH * 0.8,
            ...AccountTypeCardStyles.lottie,
          },
          blockStyle,
        ]}
        resizeMode={'contain'}
      />
    </Animated.View>
  );
};

export default AccountTypeCard;
