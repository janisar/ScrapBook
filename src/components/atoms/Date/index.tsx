import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Input} from 'react-native-elements';
import {AndroidEvent} from '@react-native-community/datetimepicker';

type Props = {
  date: Date;
  onChange: (event: AndroidEvent, value: Date | undefined) => void;
};

export const DateSelect: FunctionComponent<Props> = ({date, onChange}) => {
  const [value, setValue] = useState<Date>(new Date());
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{width: '80%'}}>
      <Input
        onTouchEnd={() => {
          setShowModal(!showModal);
        }}
        editable={false}
        value={value.toDateString()}
        style={{textAlign: 'center'}}
      />
      <DateTimePickerModal
        isVisible={showModal}
        onChange={onChange}
        date={date}
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={val => {
          setValue(val);
          setShowModal(false);
        }}
        mode={'date'}
      />
    </View>
  );
};
