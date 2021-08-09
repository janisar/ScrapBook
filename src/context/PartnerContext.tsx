import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {Partner} from '../models/partner';
import {addPartnerFetch} from '../fetch/partners';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {partnersAsyncStorageKey} from './reducers/partnerReducer';

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

  useEffect(() => {
    if (partners.length !== 0) {
      storeData(partnersAsyncStorageKey, partners);
    }
  }, [partners]);

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

  const addPartner = (partner: Partner, userId?: string) => {
    if (userId) {
      addPartnerFetch(partner, userId)
        .then(result => {
          if (result.ok) {
            setPartners([...partners, partner.withSynced()]);
          }
        })
        .catch(_ => {
          setPartners([...partners, partner]);
        });
    }
  };

  return (
    <PartnerContext.Provider
      value={{partners, setPartners, addPartner, isLoading: partnersLoading}}>
      {children}
    </PartnerContext.Provider>
  );
};

export {PartnerContextProvider, PartnerContext};
