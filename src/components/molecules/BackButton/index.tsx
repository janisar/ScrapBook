import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Text} from '../../atoms/Text';
// const BackIcon = require('../../../../assets/icons/back-arrow.png');

type Props = {
  label: string;
  onPress: () => void;
};

export const BackButton: FunctionComponent<Props> = ({label, onPress}) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    {/*<Image style={styles.backArrow} source={BackIcon} />*/}
    <Text extendedStyle={{color: 'white'}}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 20,
    flexDirection: 'row',
    paddingRight: 20,
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
