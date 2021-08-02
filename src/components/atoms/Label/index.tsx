import React, {FunctionComponent} from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  t: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export const Label: FunctionComponent = ({children}) => {
  return <Text style={styles.t}>{children}</Text>;
};
