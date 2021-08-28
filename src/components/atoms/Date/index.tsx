import React, {FunctionComponent, useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Input} from 'react-native-elements';
import moment from "moment";

type Props = {
  date: Date | string;
  onChange: (date: Event, value: Date | undefined) => void;
  onDone?: () => void;
  width?: number | string;
};

export const DateSelect: FunctionComponent<Props> = ({
  date,
  onChange,
  width = '80%',
  onDone,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{width: width}}>
      <Input
        onTouchEnd={() => {
          setShowModal(!showModal);
        }}
        editable={false}
        value={moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY')}
        style={{
          width: width,
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
