import {StyleSheet, View} from 'react-native';
import React, {forwardRef, useImperativeHandle} from 'react';
import PhoneInput from 'react-native-phone-number-input';

export interface IPhoneInputRef {
  getCountryCode: () => void;
  isValidNumber: (mobile: string) => boolean;
}

interface RnPhoneInputProps {
  phoneInputRef: any;
}

const RnPhoneInput = forwardRef<IPhoneInputRef, RnPhoneInputProps>(
  ({phoneInputRef}, ref) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');

    useImperativeHandle(ref, () => ({
      getCountryCode: () => {
        return phoneInputRef?.current?.getCountryCode();
      },
      isValidNumber: (mobile: string) => {
        return phoneInputRef.current.isValidNumber(mobile);
      },
    }));

    return (
      <View style={styles.container}>
        <PhoneInput
          ref={phoneInputRef}
          defaultValue={phoneNumber}
          defaultCode="SO"
          layout="first"
          onChangeText={text => {
            setPhoneNumber(text);
          }}
          countryPickerProps={{
            countryCodes: ['AU', 'SO'],
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
      </View>
    );
  },
);

export default RnPhoneInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
});
