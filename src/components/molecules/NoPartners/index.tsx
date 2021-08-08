import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../atoms/Text';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 9,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    opacity: 0.4,
  },
});

type Props = {
  message: string;
};

export const NoPartners: FunctionComponent<Props> = ({message}) => {
  return (
    <View style={styles.component}>
      <Text extendedStyle={styles.text}>{message}</Text>
    </View>
  );
};
