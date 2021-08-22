import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import {SelectFieldProps} from '../InputSelect';
import AmplifyTheme, {
  placeholderColor,
} from 'aws-amplify-react-native/src/AmplifyTheme';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dateFormat from 'dateformat';

export const InputDateField: FunctionComponent<SelectFieldProps> = (
  props: PropsWithChildren<any>,
) => {
  const theme = props.theme || AmplifyTheme;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();

  return (
    <View style={theme.formField}>
      <Text style={theme.inputLabel}>
        {props.label} {props.required ? '*' : ''}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setShowModal(!showModal);
        }}>
        <TextInput
          style={theme.input}
          autoCapitalize="none"
          editable={false}
          value={props.value || value}
          autoCorrect={false}
          placeholderTextColor={placeholderColor}
          {...props}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showModal}
        onChange={() => {}}
        date={new Date()}
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={val => {
          setValue(dateFormat(val, 'dd-mm-yyyy'));
          setShowModal(false);
          props.onValueChange(dateFormat(val, 'dd-mm-yyyy'));
          props.onConfirm();
        }}
        mode={'date'}
      />
    </View>
  );
};
