import React, {FunctionComponent} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

type Props = {
  extendedStyle?: {};
};

const styles = StyleSheet.create({
  p: {
    fontSize: 18,
  },
});

export const Text: FunctionComponent<Props> = ({extendedStyle, children}) => {
  return <RNText style={{...styles.p, ...extendedStyle}}>{children}</RNText>;
};
