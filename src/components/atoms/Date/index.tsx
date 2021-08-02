import React, {FunctionComponent} from 'react';
import DatePicker from 'react-native-datepicker';
import {View} from 'react-native';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};

export const DateSelect: FunctionComponent<Props> = ({date, onChange}) => {
  return (
    <View>
      <DatePicker
        style={{width: 140}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            display: 'none',
          },
          dateInput: {
            width: 120,
          },
        }}
        onDateChange={onChange}
      />
    </View>
  );
};
