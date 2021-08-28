import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChartBar,
  faHistory,
  faMap,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {HistoryPage} from '../../pages/HistoryPage';
import {ProfilePage} from '../../pages/ProfilePage';
import {MapPage} from '../../pages/MapPage';
import React, {useContext, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from '../../constants';
import {PartnerContext} from '../../context/PartnerContext';
import {CurrentRelationshipPage} from '../../pages/CurrentRelationshipPage';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const {partners} = useContext(PartnerContext);
  const [hasInProgress, setHasInProgress] = useState(false);

  useEffect(() => {
    setHasInProgress(
      Array.from(partners.values())
        .flatMap(a => a)
        .some(partner => partner.inProgress),
    );
  }, [partners]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === Screens.History) {
            return <FontAwesomeIcon icon={faHistory} />;
          } else if (route.name === Screens.Stats) {
            return <FontAwesomeIcon icon={faChartBar} />;
          } else if (route.name === Screens.Current) {
            return <FontAwesomeIcon icon={faHeart} />;
          } else {
            return <FontAwesomeIcon icon={faMap} />;
          }
        },
      })}>
      {hasInProgress && (
        <Tab.Screen
          name={Screens.Current}
          component={CurrentRelationshipPage}
          options={{headerShown: false}}
        />
      )}
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
