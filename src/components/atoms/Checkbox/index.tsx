import React, {FunctionComponent} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Text} from '../Text';
import {View} from 'react-native';

type Props = {
  title: string;
  checked: boolean;
  onClick: () => void;
};

export const CheckboxComponent: FunctionComponent<Props> = ({
  title,
  checked,
  onClick,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <CheckBox value={checked} onValueChange={onClick} />
      <Text
        extendedStyle={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 10,
        }}>
        {title}
      </Text>
    </View>
  );
};
