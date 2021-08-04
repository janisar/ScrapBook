import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryPage} from './src/pages/HistoryPage';
import './src/i18n/config';
import {ProfilePage} from './src/pages/ProfilePage';
import {RegisterFlowScreen} from './src/pages/RegisterFlowScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPartnerPage} from './src/pages/AddPartnerPage';
import {AppStateProvider} from './src/context/Context';
import {useLoginUser} from './src/hooks/useLoginUser';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="History" component={HistoryPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};
const App = () => {
  const [profile] = useLoginUser();

  return (
    <AppStateProvider>
      <NavigationContainer>
        {profile?.complete ? (
          <>
            <Stack.Navigator>
              <Stack.Screen name={'History'} component={Home} />
              <Stack.Screen
                name={'AddPartner'}
                component={AddPartnerPage}
                options={{title: 'Add new partner', headerLeft: null}}
              />
            </Stack.Navigator>
          </>
        ) : (
          <RegisterFlowScreen />
        )}
      </NavigationContainer>
    </AppStateProvider>
  );
};

export default App;
