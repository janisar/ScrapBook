import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Page} from '../../atoms/Page';
import BackButton from '../BackButton';

type Props = {
  extendedStyle: {};
  onBack: () => void;
  backLabel: string;
};

export const ScrollViewPage: FunctionComponent<Props> = ({
  extendedStyle,
  children,
  onBack,
  backLabel,
}) => (
  <Page extendedStyle={extendedStyle}>
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <BackButton label={backLabel} onPress={onBack} />
      </View>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.container}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  </Page>
);

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 100,
    top: 15,
  },
  safeAreaView: {
    flex: 9,
    borderRadius: 9,
  },
  content: {
    flex: 1,
    paddingTop: 30,
  },
  container: {
    minHeight: '90%',
    backgroundColor: '#fff',
    marginTop: 25,
    paddingHorizontal: 25,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 4,
  },
});
