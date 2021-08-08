import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {Partner} from '../models';
import {userKey} from '../hooks/useLoginUser';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {partnersAsyncStorageKey} from './reducers/partnerReducer';
import {User} from '../models/user';
import SplashScreen from 'react-native-splash-screen';

export type ContextType = {
  partners: Partner[];
  profile?: User;

  setProfile: (user: User) => void;
};

const ProfileContext = createContext<{
  profile: User;
  setProfile: (user: User) => void;
}>({
  profile: {},
  setProfile: (_: User) => {},
});

const PartnerContext = createContext<{
  partners: Partner[];
  setPartners: (partner: Partner[]) => void;
}>({
  partners: [],
  setPartners: (_: Partner[]) => {},
});

const AppStateProvider: FunctionComponent = ({children}) => {
  const [profile, setProfile] = useState<User>({});
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [partnersLoading, setPartnersLoading] = useState<boolean>(true);

  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    if (!profileLoading && !partnersLoading) {
      SplashScreen.hide();
    }
  }, [profileLoading, partnersLoading]);

  useEffect(() => {
    if (profile?.complete) {
      storeData(userKey, profile);
    }
  }, [profile]);

  useEffect(() => {
    fetchPartnersFromAsyncStorage();
  }, []);

  const fetchPartnersFromAsyncStorage = async () => {
    const data = await retrieveData<Partner[]>(partnersAsyncStorageKey);
    if (data) {
      setPartners(data);
    }
    setPartnersLoading(false);
  };

  useEffect(() => {
    if (partners.length !== 0) {
      storeData(partnersAsyncStorageKey, partners);
    }
  }, [partners]);

  useEffect(() => {
    fetchUserFromAsyncStorage();
  }, []);

  const fetchUserFromAsyncStorage = async () => {
    const data = await retrieveData<User>(userKey);
    if (data) {
      setProfile(data);
    }
    setProfileLoading(false);
  };

  return (
    <PartnerContext.Provider value={{partners, setPartners}}>
      <ProfileContext.Provider value={{profile, setProfile}}>
        {children}
      </ProfileContext.Provider>
    </PartnerContext.Provider>
  );
};

export {AppStateProvider, ProfileContext, PartnerContext};
