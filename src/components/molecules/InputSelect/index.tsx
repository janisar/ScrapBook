import React, {
  FunctionComponent,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import AmplifyTheme, {
  placeholderColor,
} from 'aws-amplify-react-native/src/AmplifyTheme';
import {SelectItem} from '../../../models';
import {Text, TextInput, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export type SelectFieldProps = {
  onValueChange: (value: string) => void;
  items?: SelectItem[];
  label?: string;
  required?: boolean;
  width?: number;
};

export const InputSelect: FunctionComponent<SelectFieldProps> = (
  props: PropsWithChildren<any>,
) => {
  const theme = props.theme || AmplifyTheme;
  const [value, setValue] = useState<SelectItem | undefined>();
  const ref = useRef();

  return (
    <View style={theme.formField}>
      <Text style={theme.inputLabel}>
        {props.label} {props.required ? '*' : ''}
      </Text>
      <TextInput
        style={theme.input}
        autoCapitalize="none"
        editable={false}
        value={value?.label}
        onPressIn={() => {
          ref?.current?.togglePicker();
        }}
        autoCorrect={false}
        placeholderTextColor={placeholderColor}
        {...props}
      />
      <RNPickerSelect
        ref={ref}
        value=""
        style={{viewContainer: {height: 0}}}
        onValueChange={val => {
          if (val) {
            const res = props.items.find(i => i.value === val);
            if (res) {
              setValue(res);
            }
          }
        }}
        onDonePress={() => {
          props.onValueChange(value?.value);
        }}
        items={props.items}
      />
    </View>
  );
};
