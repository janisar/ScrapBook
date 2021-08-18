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
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export type SelectFieldProps = {
  onValueChange: (value: string) => void;
  items?: SelectItem[];
  label?: string;
  required?: boolean;
  width?: number;
  theme?: any;
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
      <RNPickerSelect
        collapsable={false}
        ref={Platform.OS === 'ios' ? ref : null}
        value=""
        style={{
          viewContainer: {height: 0},
          inputAndroid: {
            opacity: 0,
            paddingBottom: 100,
            height: 100,
            zIndex: 100,
          },
        }}
        onValueChange={val => {
          if (val) {
            const res = props.items.find((i: SelectItem) => i.value === val);
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
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          ref?.current?.togglePicker();
        }}>
        <TextInput
          style={theme.input}
          autoCapitalize="none"
          editable={false}
          pointerEvents="none"
          value={value?.label}
          autoCorrect={false}
          placeholderTextColor={placeholderColor}
          {...props}
        />
      </TouchableOpacity>
    </View>
  );
};
