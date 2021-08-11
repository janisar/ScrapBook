import React, {FunctionComponent, useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HistoryPage} from './src/pages/HistoryPage';
import './src/i18n/config';
import {ProfilePage} from './src/pages/ProfilePage';
import {RegisterFlowScreen} from './src/pages/RegisterFlowScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {AddPartnerPage} from './src/pages/AddPartnerPage';
import {AppStateProvider} from './src/context/Context';
import {PartnerPage} from './src/pages/PartnerPage';
import {MapPage} from './src/pages/MapPage';
import {StyleSheet} from 'react-native';
import {ProfileContext} from './src/context/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarStyle = StyleSheet.create({
  style: {
    display: 'flex',
  },
  tabStyle: {
    justifyContent: 'center',
  },
});

const Home = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: tabBarStyle.style,
        tabStyle: tabBarStyle.tabStyle,
      }}>
      <Tab.Screen name="History" component={HistoryPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Map" component={MapPage} />
    </Tab.Navigator>
  );
};

const Authorized: FunctionComponent = ({children}) => {
  const {profile} = useContext(ProfileContext);
  return <>{profile?.complete ? <>{children}</> : <RegisterFlowScreen />}</>;
};

export const headerOptions = {
  headerTitleStyle: {color: '#000000', fontWeight: '200'},
  headerTitleAlign: 'left',
};

const App = () => {
  return (
    <AppStateProvider>
      <Authorized>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={'ScrapBook'}
              component={Home}
              options={headerOptions}
            />
            <Stack.Screen
              name={'AddPartner'}
              component={AddPartnerPage}
              options={{
                ...headerOptions,
                title: 'Add new partner',
                headerLeft: null,
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
