import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {FunctionComponent} from 'react';
import {ScrollViewPage} from '../components/molecules/ScrollViewPage';
import {useScrollView} from '../hooks/useScrollView';
import {
  Authenticator,
  AmplifyTheme,
  CognitoUser,
  ForgotPassword,
  RequireNewPassword,
  ConfirmSignIn,
  ConfirmSignUp,
} from 'aws-amplify-react-native';
import {ProfileContext} from '../context/UserContext';
import {ScrapBookSignUp} from '../components/organisms/ScrapBookSignUp';
import {ScrapBookSignIn} from '../components/organisms/ScrapBookSignIn';
import SplashScreen from 'react-native-splash-screen';

type Props = {};

export type loginType = 'login' | 'register';

export const RegisterFlowScreen: FunctionComponent<Props> = () => {
  const {loggedIn, setLoggedIn} = useContext(ProfileContext);
  const [offset] = useScrollView(1, () => {});

  useEffect(() => {
    if (!loggedIn) {
      SplashScreen.hide();
    }
  }, [loggedIn]);

  return (
    <ScrollViewPage
      extendedStyle={styles.safeArea}
      showBack={offset !== 0}
      backLabel={'Back'}>
      <View style={styles.scrollViewContainer}>
        <Authenticator
          signUpConfig={signUpConfig}
          hideDefault={true}
          authData={CognitoUser | 'username'}
          usernameAttributes={'Email'}
          onStateChange={authState => {
            if (authState === 'signedIn') {
              setLoggedIn(true);
            }
          }}
          theme={authTheme}>
          <ConfirmSignIn />
          <ConfirmSignUp />
          <ScrapBookSignUp signUpConfig={signUpConfig} />
          <ForgotPassword />
          <RequireNewPassword />
          <ScrapBookSignIn />
        </Authenticator>
      </View>
    </ScrollViewPage>
  );
};

const signUpConfig = {
  header: 'Register',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Name',
      key: 'name',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Gender',
      key: 'gender',
      required: true,
      displayOrder: 3,
      type: 'gender',
    },
    {
      label: 'Date of birth',
      key: 'birthdate',
      required: true,
      displayOrder: 3,
      hint: 'Hello',
      custom: true,
      type: 'date',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
  ],
};

const authTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    color: 'red',
  },
  formSection: {
    ...AmplifyTheme.formSection,
    backgroundColor: 'green',
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: 'gray',
  },
  sectionFooter: {
    ...AmplifyTheme.sectionFooter,
  },
  navButton: {
    ...AmplifyTheme.navButton,
    color: 'blue',
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: 'purple',
  },
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
