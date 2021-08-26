import React, {FunctionComponent, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import './src/i18n/config';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPartnerPage} from './src/pages/AddPartnerPage';
import {AppStateProvider} from './src/context/Context';
import {PartnerPage} from './src/pages/PartnerPage';

import {ProfileContext} from './src/context/UserContext';
const Stack = createStackNavigator();

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import {LoginModal} from './src/components/organisms/LoginModal';
import {DrawerNavigator} from './src/navigator/drawer';
import {useTranslation} from 'react-i18next';
import {BioAuth} from './src/components/organisms/BioAuth';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const Authorized: FunctionComponent = ({children}) => {
  const {loggedIn, isLoading} = useContext(ProfileContext);
  const [auth, setAuth] = useState(false);

  return (
    <>
      {!loggedIn && !isLoading && <LoginModal visible={true} />}
      {!auth && loggedIn && !isLoading && <BioAuth setAuth={setAuth} />}
      {children}
    </>
  );
};

export const headerOptions = {
  headerShown: false,
};

const App = () => {
  const {t} = useTranslation();

  return (
    <AppStateProvider>
      <Authorized>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={'ScrapBook'}
              component={DrawerNavigator}
              options={headerOptions}
            />
            <Stack.Screen
              name={'AddPartner'}
              component={AddPartnerPage}
              options={{
                ...headerOptions,
                title: t('addNewPartnerTitle'),
              }}
            />
            <Stack.Screen
              options={headerOptions}
              name={'Partner'}
              component={PartnerPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Authorized>
    </AppStateProvider>
  );
};

export default App;
