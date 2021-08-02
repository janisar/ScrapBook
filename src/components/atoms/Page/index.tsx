import {SafeAreaView, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';

type Props = {
  extendedStyle: {};
};
export const Page: FunctionComponent<Props> = ({extendedStyle, children}) => (
  <SafeAreaView style={{...styles.safeAreView, ...extendedStyle}}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
