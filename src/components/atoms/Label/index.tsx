import React, {FunctionComponent} from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  t: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

type Props = {
  extendedStyle?: {};
};

export const Label: FunctionComponent<Props> = ({children, extendedStyle}) => {
  return <Text style={{...styles.t, ...extendedStyle}}>{children}</Text>;
};
