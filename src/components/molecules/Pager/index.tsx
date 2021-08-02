import {View, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Text} from '../../atoms/Text';

type Props = {
  totalPages: number;
  currentPage: number;
};

export const Pager: FunctionComponent<Props> = ({totalPages, currentPage}) => {
  return (
    <View style={styles.pager}>
      <Text>
        {currentPage}/{totalPages}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pager: {
    alignSelf: 'center',
    marginTop: 14,
  },
});

export default Pager;
