import React, {FunctionComponent} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export type KeyboardType = 'default' | 'numeric' | 'email-address';

type Props = {
  placeholder?: string;
  onChange: (value: string) => void;
  keyboardType?: KeyboardType;
  width?: number | string;
  label?: string;
  editable?: boolean;
  secure?: boolean;
  value?: string;
};

const styles = (width: number | string) =>
  StyleSheet.create({
    input: {
      borderColor: '#898989',
      borderWidth: 1,
      borderRadius: 10,
      width: width,
      height: 30,
      padding: 0,
      paddingLeft: 4,
      fontSize: 18,
    },
    wrapper: {
      height: 30,
    },
  });
export const Input: FunctionComponent<Props> = ({
  onChange,
  placeholder,
  label,
  value,
  keyboardType = 'default',
  width = 80,
  secure,
  editable,
}) => {
  const s = styles(width);
  return (
    <View style={s.wrapper}>
      <TextInput
        style={s.input}
        value={value}
        editable={!!editable}
        placeholder={placeholder}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
    </View>
  );
};
