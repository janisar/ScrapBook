import React, {useEffect} from 'react';
import {FunctionComponent} from 'react';
import {SafeAreaView} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';

type LoginProps = {
  setUser: (user?: FBAccessToken | null) => void;
  onNext: () => void;
};

export const LoginComponent: FunctionComponent<LoginProps> = ({
  setUser,
  onNext,
}) => {
  const confirmLogin = (data?: FBAccessToken | null) => {
    if (data) {
      setUser(data);
      onNext();
    }
  };

  useEffect(() => {
    AccessToken.getCurrentAccessToken().then(confirmLogin);
  }, []);

  return (
    <SafeAreaView>
      <LoginButton
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
    </SafeAreaView>
  );
};
