import React, {FunctionComponent} from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  extendedStyle?: {};
};

const style = StyleSheet.create({
  header: {
    fontSize: 24,
  },
});

export const Header2: FunctionComponent<Props> = ({
  extendedStyle,
  children,
}) => {
  return <Text style={{...style.header, ...extendedStyle}}>{children}</Text>;
};
