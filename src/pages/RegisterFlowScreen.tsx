import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FunctionComponent} from 'react';
import {ScrollViewPage} from '../components/molecules/ScrollViewPage';
import {Text} from '../components/atoms/Text';
import {useTranslation} from 'react-i18next';
import {Select} from '../components/atoms/Select';
import {LoginComponent} from './LoginPage';
import {User, UserField, UserValue} from '../hooks/useLoginUser';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {storeData} from '../storage/AsyncStorage';
import {useFacebookUser} from '../hooks/useFacebookUser';
import {RegisterPage} from '../i18n/models';
import {InputComponent} from '../components/molecules/AgeComponent';
import {ScrollView} from '../components/atoms/ScrollView';
import {useScrollView} from '../hooks/useScrollView';

type Props = {
  saveField: (field: UserField) => (value: UserValue) => void;
  complete: () => void;
  user?: User;
};

export const RegisterFlowScreen: FunctionComponent<Props> = ({
  saveField,
  complete,
  user,
}) => {
  const {t} = useTranslation('register');
  const [profile] = useFacebookUser(user);
  const pages: RegisterPage[] = t('pages', {returnObjects: true});
  const [offset, toNextPage, , onBack] = useScrollView(pages.length, complete);

  const facebookLogin = (value?: FBAccessToken | null) => {
    if (value) {
      storeData('fbUserKey', value);
      saveField('fbUserData')(value);
    }
  };

  return (
    <ScrollViewPage
      extendedStyle={styles.safeArea}
      onBack={onBack}
      backLabel={'Back'}>
      <View style={styles.header}>
        {user && <Text>Hello, {profile?.name}</Text>}
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView pages={pages} offset={offset}>
          {pages.map(page => {
            return (
              <View style={styles.scrollViewContent}>
                <Text>{page.title}</Text>
                {page.type === 'login' && (
                  <LoginComponent setUser={facebookLogin} onNext={toNextPage} />
                )}
                {page.options && (
                  <Select
                    onChange={value => {
                      saveField(page.field!)(value);
                    }}
                    onNext={toNextPage}
                    placeholder={'Please select'}
                    items={page.options}
                  />
                )}
                {page.type === 'age' && (
                  <InputComponent
                    page={page}
                    onChange={saveField('age')}
                    onNext={toNextPage}
                  />
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
    borderRadius: 15,
  },
});
