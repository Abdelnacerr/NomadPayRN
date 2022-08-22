import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import RnPhoneInput, {IPhoneInputRef} from './RnPhoneInput';

const Login = () => {
  const phoneInputRef = React.useRef<IPhoneInputRef>();

  return (
    <>
      <Text variant="displayLarge" style={styles.textView}>
        Welcome
      </Text>
      <Card elevation={5} mode={'elevated'} style={styles.phoneContainer}>
        <Text style={styles.title} variant="headlineMedium">
          Your Phone!
        </Text>
        <RnPhoneInput phoneInputRef={phoneInputRef} />
        <Text style={styles.otpText} variant="labelMedium">
          A 4 digit otp number will be automatically sent to your phone
        </Text>
        <Button
          mode={'contained'}
          style={styles.button}
          onPress={() => {
            console.log(
              'phoneInputRef',
              phoneInputRef.current?.isValidNumber(
                `${phoneInputRef.current?.getCountryCode()}${'422673013'}`,
              ),
            );
          }}>
          OK
        </Button>
      </Card>
    </>
  );
};
export default Login;

const styles = StyleSheet.create({
  textView: {
    height: '20%',
    margin: 20,
  },
  phoneContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  title: {
    marginVertical: 25,
    marginLeft: Platform.OS === 'ios' ? 22 : 10,
  },
  otpText: {
    marginHorizontal: 30,
    color: '#BC8F8F',
  },
  button: {
    alignSelf: 'flex-end',
    marginVertical: 20,
    marginRight: 25,
    backgroundColor: '#F08080',
  },
});
