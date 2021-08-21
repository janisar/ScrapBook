import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
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

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const Authorized: FunctionComponent = ({children}) => {
  const {loggedIn, isLoading} = useContext(ProfileContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loggedIn && !isLoading) {
      setShow(true);
    }
  }, [loggedIn, isLoading]);

  return (
    <>
      {!loggedIn && !isLoading && <LoginModal visible={true} />}
      {children}
    </>
  );
};

export const headerOptions = {
  headerShown: false,
};

const App = () => {
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
                title: 'Add new partner',
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
