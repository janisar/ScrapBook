import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {ScrollView, View} from 'react-native';
import {
  AmplifyButton,
  FormField,
  LinkCell,
  Wrapper,
  Header,
} from 'aws-amplify-react-native';
import {Auth} from 'aws-amplify';
import {I18n} from 'aws-amplify';
import {AccessToken, LoginButton, Profile} from 'react-native-fbsdk-next';
import {ProfileContext} from '../../../context/UserContext';
import { useFacebookUser } from "../../../hooks/useFacebookUser";

type LoginForm = {
  email?: string;
  password?: string;
};

export const ScrapBookSignIn: FunctionComponent = (
  props: PropsWithChildren<any>,
) => {
  const [form, setForm] = useState<LoginForm>({});
  useFacebookUser(undefined);
  const {setLoggedIn} = useContext(ProfileContext);
  if (props.authState !== 'signIn') {
    return null;
  }
  async function signIn() {
    try {
      if (form.email && form.password) {
        const user = await Auth.signIn(form.email, form.password);
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
