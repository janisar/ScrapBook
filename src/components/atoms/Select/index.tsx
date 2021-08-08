import React, {FunctionComponent} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {SelectItem} from '../../../models';
import {Label} from '../Label';
import {Platform, StyleSheet, View} from 'react-native';

type Props = {
  onChange: (value: string) => void;
  items: SelectItem[];
  placeholder: string;
  label?: string;
  onNext: () => void;
  extendedStyle?: {};
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
  },
  inputAndroid: {
    fontSize: 18,
    color: 'black',
  },
  wrapper: {
    width: Platform.OS === 'android' ? '95%' : 'auto',
    flex: 1,
  },
});
export const Select: FunctionComponent<Props> = ({
  onChange,
  items,
  label,
  placeholder,
  extendedStyle,
  onNext,
}) => {
  return (
    <View style={{...styles.wrapper, ...extendedStyle}}>
      {label && <Label>{label}: </Label>}
      {!label && <Label>&nbsp;</Label>}
      <RNPickerSelect
        style={styles}
        placeholder={{label: placeholder, value: 0}}
        onValueChange={onChange}
        onDonePress={onNext}
        items={items}
      />
    </View>
  );
};
