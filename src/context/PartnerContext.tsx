import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Partner} from '../models/partner';
import {addPartnerFetch, getAllPartnersFetch} from '../fetch/partners';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {partnersAsyncStorageKey} from './reducers/partnerReducer';
import {ProfileContext} from './UserContext';

const PartnerContext = createContext<{
  partners: Partner[];
  setPartners: (partner: Partner[]) => void;
  addPartner: (partner: Partner, userId?: string) => void;
  deletePartner: (partner: Partner) => void;
  isLoading: boolean;
  clearAll: () => void;
}>({
  partners: [],
  addPartner: (_p: Partner, _?: string) => {},
  deletePartner: (_: Partner) => {},
  setPartners: (_: Partner[]) => {},
  isLoading: true,
  clearAll: () => {},
});

export function sortPartners(arr: Partner[]): Partner[] {
  return arr.sort((p, p2) => {
    if (p.startDate && p2.startDate) {
      if (p.startDate < p2.startDate) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return p.name!.localeCompare(p2.name!);
    }
  });
}

const PartnerContextProvider: FunctionComponent = ({children}) => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState<boolean>(true);
  const {profile} = useContext(ProfileContext);

  useEffect(() => {
    if (partners && partners.length !== 0) {
      storeData(partnersAsyncStorageKey, partners);
    }
  }, [partners]);

  useEffect(() => {
    if (!partnersLoading && (!partners || partners.length === 0)) {
      getAllPartnersFetch(profile.id!)
        .then(result => {
          if (result) {
            setPartners(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [partnersLoading, profile.id]);

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
      } catch (e) {
        console.error(e);
      }
    }
    return Promise.resolve(partner);
  };

  const deletePartner = (partner: Partner) => {
    setPartners(partners.filter(p => partner.id !== p.id));
    storeData(partnersAsyncStorageKey, partners);
  };

  const clearAll = () => {
    setPartners([]);
    storeData(partnersAsyncStorageKey, []);
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
          setPartners(sortPartners(res));
          setPartnersLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      setPartnersLoading(false);
    }
  };

  const addPartner = (partner: Partner, _?: string) => {
    syncPartner(partner)
      .then(res => {
        setPartners(sortPartners([...partners, res]));
      })
      .catch(err => console.log(err));
  };

  return (
    <PartnerContext.Provider
      value={{
        partners,
        setPartners,
        addPartner,
        isLoading: partnersLoading,
        deletePartner,
        clearAll,
      }}>
      {children}
    </PartnerContext.Provider>
  );
};

export {PartnerContextProvider, PartnerContext};
