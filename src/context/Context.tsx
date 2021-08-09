import React, {FunctionComponent} from 'react';
import {PartnerContextProvider} from './PartnerContext';
import {UserContextProvider} from './UserContext';
import {SplashContextProvider} from './SplashContext';

const AppStateProvider: FunctionComponent = ({children}) => {
  return (
    <PartnerContextProvider>
      <UserContextProvider>
        <SplashContextProvider>{children}</SplashContextProvider>
      </UserContextProvider>
    </PartnerContextProvider>
  );
};

export {AppStateProvider};
