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
  value?: string;
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    marginTop: 10,
  },
  inputAndroid: {
    fontSize: 18,
    color: 'black',
  },
  wrapper: {
    minWidth: Platform.OS === 'android' ? 200 : 'auto',
    flex: 1,
  },
});
export const Select: FunctionComponent<Props> = ({
  onChange,
  items,
  label,
  placeholder,
  extendedStyle,
  value,
  onNext,
}) => {
  return (
    <View style={{...styles.wrapper, ...extendedStyle}}>
      {label && <Label>{label}: </Label>}
      {!label && <Label>&nbsp;</Label>}
      <RNPickerSelect
        value={value}
        style={styles}
        placeholder={{label: placeholder, value: 0}}
        onValueChange={onChange}
        onDonePress={onNext}
        items={items}
      />
    </View>
  );
};
