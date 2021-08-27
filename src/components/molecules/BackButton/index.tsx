import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Text} from '../../atoms/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

type Props = {
  label: string;
  onPress: () => void;
};

export const BackButton: FunctionComponent<Props> = ({label, onPress}) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    <FontAwesomeIcon icon={faArrowLeft} size={10} />
    <Text
      extendedStyle={{
        color: '#6a6a6a',
        fontWeight: '400',
        fontSize: 16,
        marginLeft: 5,
      }}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 20,
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: 6,
    fontSize: 16,
  },
});

export default BackButton;
