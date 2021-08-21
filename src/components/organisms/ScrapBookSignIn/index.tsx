import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {Alert, Button, Platform, ScrollView, View} from 'react-native';
import {
  AmplifyButton,
  FormField,
  LinkCell,
  Wrapper,
  Header,
} from 'aws-amplify-react-native';
import jwt_decode from 'jwt-decode';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {Auth} from 'aws-amplify';
import {I18n} from 'aws-amplify';
import {AccessToken, LoginButton, Profile} from 'react-native-fbsdk-next';
import {ProfileContext} from '../../../context/UserContext';
import {useFacebookUser} from '../../../hooks/useFacebookUser';

type LoginForm = {
  email?: string;
  password?: string;
};

type Props = {
  skip: () => void;
};

export const ScrapBookSignIn: FunctionComponent<Props> = (
  props: PropsWithChildren<any>,
) => {
  const [form, setForm] = useState<LoginForm>({});
  useFacebookUser(undefined);
  const {setLoggedIn, setProfile} = useContext(ProfileContext);
  if (props.authState !== 'signIn') {
    return null;
  }

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (appleAuthRequestResponse.identityToken) {
        const user: {email: string} = jwt_decode(
          appleAuthRequestResponse.identityToken,
        );
        const profile = {
          id: appleAuthRequestResponse.user,
          email: user.email,
          complete: true,
        };
        setLoggedIn(true);
        setProfile(profile);
      }
    }
  }

  async function signIn() {
    try {
      if (form.email && form.password) {
        await Auth.signIn(form.email, form.password);
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  }
  return (
    <Wrapper>
      <ScrollView
        style={props.theme.sectionScroll}
        keyboardShouldPersistTaps="handled">
        <Header>Sign in</Header>
        <View style={props.theme.sectionBody}>
          <FormField
            theme={props.theme}
            onChangeText={(text: string) => {
              setForm({...form, email: text});
            }}
            label={I18n.get('Email')}
            placeholder={I18n.get('Enter your email')}
            required={true}
          />
          <FormField
            theme={props.theme}
            onChangeText={(text: string) => {
              setForm({...form, password: text});
            }}
            label={I18n.get('Password')}
            placeholder={I18n.get('Enter your password')}
            secureTextEntry={true}
            required={true}
          />
          <AmplifyButton
            text={I18n.get('Sign In').toUpperCase()}
            theme={props.theme}
            onPress={() => {
              signIn();
            }}
            disabled={false}
          />
          <LoginButton
            style={{width: '100%', height: 49, marginTop: 20}}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(token =>
                  Profile.getCurrentProfile().then(currentProfile => {
                    if (currentProfile) {
                      setLoggedIn(true);
                    }
                  }),
                );
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                marginTop: 20,
                borderRadius: 0,
                width: '100%', // You must specify a width
                height: 45, // You must specify a height
              }}
              onPress={() => onAppleButtonPress()}
            />
          )}
          <View style={{marginTop: 15}}>
            <Button
              onPress={() => {
                props.skip();
              }}
              title={'Continue without logging in'}
            />
          </View>
        </View>
        <View style={props.theme.sectionFooter}>
          <LinkCell
            theme={props.theme}
            onPress={() => {
              props.onStateChange('forgotPassword');
            }}>
            {I18n.get('Forgot Password')}
          </LinkCell>
          <LinkCell
            theme={props.theme}
            onPress={() => {
              props.onStateChange('signUp');
            }}>
            {I18n.get('Sign Up')}
          </LinkCell>
        </View>
      </ScrollView>
    </Wrapper>
  );
};
