import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView as RNScrollView, StyleSheet} from 'react-native';
import {ScrollViewPage} from '../../../i18n/models';

type Props = {
  pages: ScrollViewPage[];
  offset: number;
};

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export const ScrollView: FunctionComponent<Props> = ({
  pages,
  offset,
  children,
}) => {
  const [ref, setScrollViewRef] = useState<RNScrollView | null>();

  useEffect(() => {
    if (ref) {
      ref.scrollTo({x: offset});
    }
  }, [offset, ref]);

  return (
    <RNScrollView
      ref={r => setScrollViewRef(r)}
      horizontal={true}
      contentContainerStyle={{
        ...styles.scrollView,
        width: `${100 * pages.length}%`,
      }}
      showsHorizontalScrollIndicator={true}
      scrollEnabled={false}>
      {children}
    </RNScrollView>
  );
};
