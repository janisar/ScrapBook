import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from '../../atoms/Input';

type InputComponentProps = {
  onChange: (value: string) => void;
  width?: number;
  placeholder?: string;
  extendedStyle?: {};
  value?: string;
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
  placeholder,
}) => {
  return (
    <View style={{...styles.inputComponent, ...extendedStyle}}>
      <Input
        onChange={onChange}
        width={width}
        value={value}
        placeholder={placeholder}
        editable={true}
      />
    </View>
  );
};
