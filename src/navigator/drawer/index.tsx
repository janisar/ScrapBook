import React, {useContext} from 'react';
import {ProfileContext} from '../../context/UserContext';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {TabNavigator} from '../tab';
import {AddPartnerPage} from '../../pages/AddPartnerPage';
import {PartnerContext} from '../../context/PartnerContext';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {logOut, loggedIn} = useContext(ProfileContext);
  const {clearAll} = useContext(PartnerContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {
          fontWeight: '200',
        },
        headerTitleStyle: {
          fontWeight: '200',
        },
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {loggedIn && (
              <DrawerItem
                label="Log out"
                labelStyle={{fontWeight: '200'}}
                onPress={async () => {
                  clearAll();
                  logOut();
                  // @ts-ignore
                  props.navigation.navigate('ScrapBook');
                }}
              />
            )}
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name={'ScrapBook'} component={TabNavigator} />
      <Drawer.Screen name={'Add new partner'} component={AddPartnerPage} />
    </Drawer.Navigator>
  );
};
