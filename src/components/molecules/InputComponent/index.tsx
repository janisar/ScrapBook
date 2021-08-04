import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from '../../atoms/Input';

type InputComponentProps = {
  onChange: (value: string) => void;
  width?: number;
  placeholder?: string;
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
  placeholder,
}) => {
  return (
    <View style={styles.inputComponent}>
      <Input
        onChange={onChange}
        width={width}
        placeholder={placeholder}
        editable={true}
      />
    </View>
  );
};
