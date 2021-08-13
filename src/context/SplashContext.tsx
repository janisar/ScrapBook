import React, {FunctionComponent, useContext, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PartnerContext} from './PartnerContext';
import {ProfileContext} from './UserContext';

const SplashContextProvider: FunctionComponent = ({children}) => {
  const {isLoading: partnersLoading} = useContext(PartnerContext);
  const {isLoading: profileLoading} = useContext(ProfileContext);

  useEffect(() => {
    if (!profileLoading && !partnersLoading) {
      SplashScreen.hide();
    }
  }, [profileLoading, partnersLoading]);

  return <>{children}</>;
};

export {SplashContextProvider};
