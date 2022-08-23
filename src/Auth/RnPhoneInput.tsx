import {StyleSheet, Text, View} from 'react-native';
import React, {FC, LegacyRef} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {Control, Controller} from 'react-hook-form';

export interface RnPhoneInputProps {
  control?: Control;
  rules: {};
  phoneInputRef: LegacyRef<PhoneInput> | undefined;
}

const RnPhoneInput: FC<RnPhoneInputProps> = ({
  control,
  rules = {},
  phoneInputRef,
}) => {
  return (
    <Controller
      name="mobile"
      control={control}
      defaultValue=""
      rules={rules}
      render={({field: {value, onChange}, fieldState: {error}}) => (
        <>
          <View style={styles.container}>
            <PhoneInput
              ref={phoneInputRef}
              value={value}
              defaultCode="AU"
              layout="first"
              onChangeText={onChange}
              countryPickerProps={{
                countryCodes: ['AU', 'SO'],
                rules: {
                  required: 'Phone number is required',
                },
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        </>
      )}
    />
  );
};

export default RnPhoneInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
});
