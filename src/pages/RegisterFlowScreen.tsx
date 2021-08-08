import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {FunctionComponent} from 'react';
import {ScrollViewPage} from '../components/molecules/ScrollViewPage';
import {useTranslation} from 'react-i18next';
import {Select} from '../components/atoms/Select';
import {LoginComponent} from './LoginPage';
import {useLoginUser} from '../hooks/useLoginUser';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {storeData} from '../storage/AsyncStorage';
import {RegisterPage} from '../i18n/models';
import {ScrollView} from '../components/atoms/ScrollView';
import {useScrollView} from '../hooks/useScrollView';
import {Header2} from '../components/atoms/Header2';
import Button from '../components/molecules/Button';
import {Input} from '../components/atoms/Input';

type Props = {};

export const RegisterFlowScreen: FunctionComponent<Props> = () => {
  const [, saveField, facebookLogin, complete] = useLoginUser();
  const {t} = useTranslation('register');
  const pages: RegisterPage[] = t('pages', {returnObjects: true});
  const [offset, toNextPage, , onBack] = useScrollView(pages.length, complete);

  return (
    <ScrollViewPage
      extendedStyle={styles.safeArea}
      onBack={onBack}
      backLabel={'Back'}>
      <View style={styles.scrollViewContainer}>
        <ScrollView pages={pages} offset={offset}>
          {pages.map(page => {
            return (
              <View style={styles.scrollViewContent} key={page.title}>
                <Header2 extendedStyle={styles.header}>{page.title}</Header2>
                <View style={styles.page}>
                  {page.type === 'login' && (
                    <LoginComponent
                      setUser={facebookLogin}
                      onNext={toNextPage}
                    />
                  )}
                </View>
                {page.options && (
                  <View style={styles.page}>
                    <Select
                      onChange={value => {
                        saveField(page.field!)(value);
                      }}
                      extendedStyle={{alignItems: 'center'}}
                      onNext={toNextPage}
                      placeholder={'Please select'}
                      items={page.options}
                    />
                    {Platform.OS === 'android' && (
                      <Button
                        inProgress={false}
                        label={'Next'}
                        onPress={toNextPage}
                        extendedStyle={{}}
                        disabled={false}
                      />
                    )}
                  </View>
                )}
                {page.type === 'age' && (
                  <View style={styles.page}>
                    <Input
                      onChange={saveField('age')}
                      keyboardType={'numeric'}
                      width={120}
                      placeholder={'Enter your age'}
                      editable={true}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={styles.actionButton}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollViewPage>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 0,
    height: '100%',
    backgroundColor: 'purple',
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  scrollViewContainer: {
    flex: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  scrollViewContent: {
    flexBasis: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 20,
  },
  actionButton: {
    justifyContent: 'center',
  },
  page: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
