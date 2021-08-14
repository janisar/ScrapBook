import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, KeyboardType} from '../../atoms/Input';

type InputComponentProps = {
  onChange: (value: string) => void;
  width?: number | string;
  placeholder?: string;
  extendedStyle?: {};
  value?: string;
  secure?: boolean;
  type?: KeyboardType;
};

const styles = StyleSheet.create({
  inputComponent: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
});

export const InputComponent: FunctionComponent<InputComponentProps> = ({
  onChange,
  width,
  extendedStyle,
  value,
  secure,
  type,
  placeholder,
}) => {
  return (
    <View style={{...styles.inputComponent, ...extendedStyle}}>
      <Input
        onChange={onChange}
        width={width}
        value={value}
        placeholder={placeholder}
        secure={secure}
        editable={true}
      />
    </View>
  );
};
