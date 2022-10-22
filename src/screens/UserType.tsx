import * as React from 'react';
import {View, Dimensions} from 'react-native';
import Lottie from 'lottie-react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {withAnchorPoint} from '../utils/anchorPoint';
import {accountLotties} from '../utils/items';
import {Text} from 'react-native-paper';
import {useGetaccountTypeQuery} from '../RTK/services/getAccountTypes';

const colors = ['#867EB1', '#FF4D4D', '#040F01'];

const dimensions = Dimensions.get('window');
const PAGE_WIDTH = dimensions.width;
const PAGE_HEIGHT = dimensions.height;

function UserType() {
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
          <Card animationValue={animationValue} key={index} index={index} />
        )}
      />
    </View>
  );
}

const Card: React.FC<{
  index: number;
  animationValue: Animated.SharedValue<number>;
}> = ({index, animationValue}) => {
  const WIDTH = PAGE_WIDTH / 1.5;
  const HEIGHT = PAGE_HEIGHT / 1.5;

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
  const {data} = useGetaccountTypeQuery();
  const accountType = data
    ?.map(accountType => accountType.type)
    .map(type => type)
    .filter(type => type !== 'admin');

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
      </Animated.View>
      <Lottie
        source={accountLotties[index % 3]}
        autoPlay
        loop
        style={[
          {
            width: WIDTH * 0.8,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 999,
          },
          blockStyle,
        ]}
        resizeMode={'contain'}
      />
    </Animated.View>
  );
};

export default UserType;
