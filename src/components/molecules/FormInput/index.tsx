import React, {FunctionComponent} from 'react';
import {FormField, AmplifyTheme} from 'aws-amplify-react-native';

type Props = {
  onChange: (text: string) => void;
  label?: string;
  placeholder?: string;
  width?: number;
};
export const FormInput: FunctionComponent<Props> = ({
  onChange,
  width,
  label,
  placeholder,
}) => {
  const theme = authTheme(width);
  return (
    <FormField
      theme={theme}
      onChangeText={onChange}
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
