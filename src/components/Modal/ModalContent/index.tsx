import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  next: () => void;
  value?: string;
};

export const ModalContent: FunctionComponent<Props> = ({
  children,
  value,
  next,
}) => {
  useEffect(() => {
    if (value) {
      next();
    }
  }, [value]);

  return <View style={styles.modalContent}>{children}</View>;
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
});
