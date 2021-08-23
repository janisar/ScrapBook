import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  add: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: '#d2d2d2',
    shadowOffset: {
      width: 0.4,
      height: 0.4,
    },
    shadowColor: '#000',
    shadowOpacity: 0.4,
  },
});

type AddProps = {
  onPress: () => void;
  label?: string;
  width?: number;
};

export const AddButton: FunctionComponent<AddProps> = ({onPress, width}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.add}>
      <FontAwesomeIcon icon={faPlus} color={'#2f2f2f'} width={width} height={width} />
    </TouchableOpacity>
  );
};
