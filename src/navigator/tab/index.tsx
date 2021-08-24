import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChartBar, faHistory, faMap} from '@fortawesome/free-solid-svg-icons';
import {HistoryPage} from '../../pages/HistoryPage';
import {ProfilePage} from '../../pages/ProfilePage';
import {MapPage} from '../../pages/MapPage';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../../constants';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === Screens.History) {
            return <FontAwesomeIcon icon={faHistory} />;
          } else if (route.name === Screens.Stats) {
            return <FontAwesomeIcon icon={faChartBar} />;
          } else {
            return <FontAwesomeIcon icon={faMap} />;
          }
        },
      })}>
      <Tab.Screen
        name={Screens.History}
        component={HistoryPage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Screens.Stats}
        component={ProfilePage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={Screens.Map}
        component={MapPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
