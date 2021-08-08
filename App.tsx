import React, {FunctionComponent, useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryPage} from './src/pages/HistoryPage';
import './src/i18n/config';
import {ProfilePage} from './src/pages/ProfilePage';
import {RegisterFlowScreen} from './src/pages/RegisterFlowScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPartnerPage} from './src/pages/AddPartnerPage';
import {AppStateProvider, ProfileContext} from './src/context/Context';
import {PartnerPage} from './src/pages/PartnerPage';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarStyle = StyleSheet.create({
  style: {
    paddingBottom: 17,
  },
});

const Home = () => {
  return (
    <Tab.Navigator tabBarOptions={{style: tabBarStyle.style}}>
      <Tab.Screen name="History" component={HistoryPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const Authorized: FunctionComponent = ({children}) => {
  const {profile} = useContext(ProfileContext);
  return <>{profile?.complete ? <>{children}</> : <RegisterFlowScreen />}</>;
};

const App = () => {
  return (
    <AppStateProvider>
      <Authorized>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={'History'} component={Home} />
            <Stack.Screen
              name={'AddPartner'}
              component={AddPartnerPage}
              options={{title: 'Add new partner', headerLeft: null}}
            />
            <Stack.Screen name={'Partner'} component={PartnerPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Authorized>
    </AppStateProvider>
  );
};

export default App;
