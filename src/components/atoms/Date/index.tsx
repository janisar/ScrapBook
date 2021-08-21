import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Input} from 'react-native-elements';

type Props = {
  date: Date | string;
  onChange: (date: Event, value: Date | undefined) => void;
  onDone?: () => void;
};

export const DateSelect: FunctionComponent<Props> = ({
  date,
  onChange,
  onDone,
}) => {
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
        style={{
          textAlign: 'center',
          borderWidth: 1,
          borderColor: '#eaeaea',
          padding: 16,
        }}
      />
      <DateTimePickerModal
        isVisible={showModal}
        onChange={onChange}
        date={new Date(date)}
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={val => {
          setValue(val);
          setShowModal(false);
          if (onDone) {
            onDone();
          }
        }}
        mode={'date'}
      />
    </View>
  );
};
