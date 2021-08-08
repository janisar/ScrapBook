import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  add: {
    padding: 16,
    borderRadius: 100,
    backgroundColor: '#d2d2d2',
  },
});

type AddProps = {
  onPress: () => void;
  label?: string;
};

export const AddButton: FunctionComponent<AddProps> = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.add}>
      <Text>
        <FontAwesomeIcon icon={faPlus} />
      </Text>
    </TouchableOpacity>
  );
};
