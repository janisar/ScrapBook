import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
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
  value?: SelectItem | string;
  onConfirm?: () => void;
};

export const InputSelect: FunctionComponent<SelectFieldProps> = (
  props: PropsWithChildren<any>,
) => {
  const theme = props.theme || AmplifyTheme;
  const [value, setValue] = useState<SelectItem | undefined>(props.value);
  const ref = useRef();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={theme.formField}>
      <Text style={theme.inputLabel}>
        {props.label} {props.required ? '*' : ''}
      </Text>
      <RNPickerSelect
        collapsable={false}
        ref={Platform.OS === 'ios' ? ref : null}
        value={value?.value}
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
              if (Platform.OS === 'android') {
                props.onValueChange(value?.value);
              }
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
          autoCorrect={false}
          placeholderTextColor={placeholderColor}
          {...props}
          value={value?.label}
        />
      </TouchableOpacity>
    </View>
  );
};
