import React, {FunctionComponent} from 'react';
import {PartnerContextProvider} from './PartnerContext';
import {UserContextProvider} from './UserContext';
import {SplashContextProvider} from './SplashContext';

const AppStateProvider: FunctionComponent = ({children}) => {
  return (
    <UserContextProvider>
      <PartnerContextProvider>
        <SplashContextProvider>{children}</SplashContextProvider>
      </PartnerContextProvider>
    </UserContextProvider>
  );
};

export {AppStateProvider};
