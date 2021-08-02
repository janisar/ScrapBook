import React, {FunctionComponent} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {SelectItem} from '../../../models';
import {Label} from '../Label';
import {StyleSheet, View} from 'react-native';

type Props = {
  onChange: (value: string) => void;
  items: SelectItem[];
  placeholder: string;
  label?: string;
  onNext: () => void;
};

const styles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
  },
  inputAndroid: {
    fontSize: 18,
  },
});
export const Select: FunctionComponent<Props> = ({
  onChange,
  items,
  label,
  placeholder,
  onNext,
}) => {
  return (
    <View>
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
