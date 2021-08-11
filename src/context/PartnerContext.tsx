import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Partner} from '../models/partner';
import {addPartnerFetch} from '../fetch/partners';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {partnersAsyncStorageKey} from './reducers/partnerReducer';
import {ProfileContext} from './UserContext';

const PartnerContext = createContext<{
  partners: Partner[];
  setPartners: (partner: Partner[]) => void;
  addPartner: (partner: Partner, userId?: string) => void;
  isLoading: boolean;
}>({
  partners: [],
  addPartner: (_p: Partner, _?: string) => {},
  setPartners: (_: Partner[]) => {},
  isLoading: true,
});

const PartnerContextProvider: FunctionComponent = ({children}) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState<boolean>(true);
  const {profile} = useContext(ProfileContext);

  useEffect(() => {
    if (partners.length !== 0) {
      storeData(partnersAsyncStorageKey, partners);
    }
  }, [partners]);

  useEffect(() => {
    fetchPartnersFromAsyncStorage();
  }, []);

  const syncPartner = (partner: Partner): Promise<Partner> => {
    if (!partner.synced && profile.id) {
      try {
        addPartnerFetch(partner, profile.id).then(result => {
          if (result.ok) {
            return Promise.resolve(partner.withSynced());
          }
        });
      } catch (e) {}
    }
    return Promise.resolve(partner);
  };

  const fetchPartnersFromAsyncStorage = async () => {
    const data = await retrieveData<Partner[]>(partnersAsyncStorageKey);
    if (data) {
      const updatedData = Promise.all(
        data.map(partner => {
          return syncPartner(partner);
        }),
      );
      updatedData
        .then(res => {
          setPartners(res);
          setPartnersLoading(false);
        })
        .catch(err => console.log(err));
    }
  };

  const addPartner = (partner: Partner, _?: string) => {
    syncPartner(partner)
      .then(res => {
        setPartners([...partners, res]);
      })
      .catch(err => console.log(err));
  };

  return (
    <PartnerContext.Provider
      value={{partners, setPartners, addPartner, isLoading: partnersLoading}}>
      {children}
    </PartnerContext.Provider>
  );
};

export {PartnerContextProvider, PartnerContext};
