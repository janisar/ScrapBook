import React, {FunctionComponent} from 'react';
import {FormField, AmplifyTheme} from 'aws-amplify-react-native';
import {KeyboardType} from '../../atoms/Input';

type Props = {
  onChange: (text: string) => void;
  value?: string | number;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  width?: number;
};
export const FormInput: FunctionComponent<Props> = ({
  onChange,
  value,
  width,
  label,
  placeholder,
  keyboardType = 'default',
}) => {
  const theme = authTheme(width);
  return (
    <FormField
      theme={theme}
      onChangeText={onChange}
      value={value}
      keyboardType={keyboardType}
      label={label}
      placeholder={placeholder}
      secureTextEntry={false}
      required={true}
    />
  );
};

const authTheme = (width: number = 220) => ({
  ...AmplifyTheme,
  input: {
    ...AmplifyTheme.input,
    width: width,
  },
  formField: {
    ...AmplifyTheme.formField,
    justifyContent: 'center',
  },
});
