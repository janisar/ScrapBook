import React, {useContext, useEffect, useState} from 'react';
import {FunctionComponent} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {InputComponent} from '../components/molecules/InputComponent';
import Button from '../components/molecules/Button';
import {loginType} from './RegisterFlowScreen';
import {User} from '../models/user';
import {registerUser} from '../fetch/user';
import {ProfileContext} from '../context/UserContext';
import {UserField, UserValue} from '../hooks/useLoginUser';
import { getUniqueId } from "react-native-device-info";

type LoginProps = {
  setUser: (user?: FBAccessToken | null) => void;
  onNext: () => void;
  saveField: (field: UserField) => (value: UserValue) => void;
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fb: {
    flex: 5,
    justifyContent: 'flex-start',
    marginTop: 20,
    alignItems: 'center',
  },
  fbLoginButton: {
    marginTop: 10,
    width: '100%',
    height: 49,
  },
});

type RegisterForm = {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
};

function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const LoginComponent: FunctionComponent<LoginProps> = ({
  setUser,
  saveField,
  onNext,
}) => {
  const [type, setType] = useState<loginType>('login');
  const {profile} = useContext(ProfileContext);
  console.log(profile);

  const confirmLogin = (data?: FBAccessToken | null) => {
    if (data) {
      setUser(data);
      onNext();
    }
  };

  useEffect(() => {
    AccessToken.getCurrentAccessToken().then(confirmLogin);
  }, []);

  const register = async () => {
    if (profile.password && validateEmail(profile.email!)) {
      const user: User = {
        auth: 'congnito',
        id: getUniqueId(),
        email: profile.email,
        password: profile.password,
      };
      await registerUser(user);
      onNext();
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      {type === 'login' && (
        <>
          <View style={styles.login}>
            <InputComponent
              onChange={() => {}}
              placeholder={'Username'}
              width={300}
            />
            <InputComponent
              onChange={() => {}}
              placeholder={'Password'}
              width={300}
            />
            <Button
              onPress={() => {}}
              label={'Log in'}
              inProgress={false}
              disabled={false}
              extendedStyle={styles.fbLoginButton}
            />
            <Button
              onPress={() => setType('register')}
              label={'Register'}
              inProgress={false}
              disabled={false}
              extendedStyle={styles.fbLoginButton}
            />
          </View>
          <View style={styles.fb}>
            <LoginButton
              style={styles.fbLoginButton}
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(confirmLogin);
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            />
          </View>
        </>
      )}
      {type === 'register' && (
        <>
          <View style={styles.login}>
            <InputComponent
              onChange={saveField('email')}
              placeholder={'Email'}
              type={'email-address'}
              extendedStyle={{marginTop: 0}}
              width={300}
            />
            <InputComponent
              onChange={saveField('name')}
              placeholder={'Name'}
              width={300}
            />
            <InputComponent
              onChange={saveField('password')}
              placeholder={'Password'}
              secure={true}
              width={300}
            />
            <InputComponent
              onChange={saveField('passwordConfirm')}
              placeholder={'Confirm password'}
              secure={true}
              width={300}
            />
          </View>
          <View style={{flex: 2}}>
            <Button
              onPress={() => register()}
              label={'Register'}
              inProgress={false}
              disabled={false}
              extendedStyle={styles.fbLoginButton}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
