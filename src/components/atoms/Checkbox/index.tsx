import {Label} from '../Label';
import React, {FunctionComponent} from 'react';
import CheckBox from 'react-native-check-box';

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
    <>
      <CheckBox leftText={title} isChecked={checked} onClick={onClick} />
    </>
  );
};
