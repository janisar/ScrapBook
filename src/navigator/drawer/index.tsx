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
import {useTranslation} from 'react-i18next';
import {Screens} from '../../constants';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {logOut, loggedIn} = useContext(ProfileContext);
  const {clearAll} = useContext(PartnerContext);
  const {t} = useTranslation();
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
                label={t('log out')}
                labelStyle={{fontWeight: '200'}}
                onPress={async () => {
                  clearAll();
                  logOut();
                  // @ts-ignore
                  props.navigation.navigate(Screens.Home);
                }}
              />
            )}
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name={Screens.Home} component={TabNavigator} />
      <Drawer.Screen name={Screens.AddNew} component={AddPartnerPage} />
    </Drawer.Navigator>
  );
};
