import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Partner} from '../models/partner';
import {
  addPartnerFetch,
  getAllPartnersFetch,
  removePartner,
} from '../fetch/partners';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {partnersAsyncStorageKey} from './reducers/partnerReducer';
import {ProfileContext} from './UserContext';
import {getYearFromDate} from '../utils/dateUtils';
import {
  addPartnerToMap,
  calculateInProgressPartnerDuration,
  mapPartners,
  mapPartnersForAsyncStorage,
} from '../utils/partners';
import { syncPartner } from "../services/partnerService";

const PartnerContext = createContext<{
  partners: Map<number, Partner[]>;
  setPartners: (partner: Map<number, Partner[]>) => void;
  addPartner: (partner: Partner, userId?: string) => void;
  updatePartner: (partner: Partner) => void;
  deletePartner: (partner: Partner) => void;
  isLoading: boolean;
  clearAll: () => void;
  syncPartner: (partner: Partner, userId: string) => void;
  end: (partner: Partner, endDate: Date) => void;
}>({
  partners: new Map(),
  addPartner: (_p: Partner, _?: string) => {},
  deletePartner: (_: Partner) => {},
  setPartners: (_: Map<number, Partner[]>) => {},
  updatePartner: () => {},
  isLoading: true,
  clearAll: () => {},
  syncPartner: (_: Partner, _id: string) => {},
  end: () => {},
});

export function partnersSortFunc() {
  return (p: Partner, p2: Partner) => {
    if (p.startDate && p2.startDate) {
      if (p.startDate < p2.startDate) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return p.name!.localeCompare(p2.name!);
    }
  };
}

export function sortPartners(arr: Partner[]): Partner[] {
  return arr.sort(partnersSortFunc());
}

const PartnerContextProvider: FunctionComponent = ({children}) => {
  const [partners, setPartners] = useState<Map<number, Partner[]>>(new Map());
  const [partnersLoading, setPartnersLoading] = useState<boolean>(true);
  const {profile} = useContext(ProfileContext);

  useEffect(() => {
    if (partners && partners.size) {
      storeData(partnersAsyncStorageKey, mapPartnersForAsyncStorage(partners));
    }
  }, [partners]);

  useEffect(() => {
    if (!partnersLoading && (!partners || !partners.size)) {
      getAllPartnersFetch(profile.id!)
        .then(result => {
          if (result) {
            setPartners(mapPartners(result));
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

  const deletePartner = (partner: Partner) => {
    const year = getYearFromDate(partner.startDate);
    if (year) {
      const newPartners = partners.get(year)?.filter(p => partner.id !== p.id);
      partners.set(year, newPartners || []);
      if (partners.get(year)?.length === 0) {
        partners.delete(year);
      }
      setPartners(new Map(partners));
      removePartner(partner.id);
      storeData(
        partnersAsyncStorageKey,
        Array.from(partners.entries()).flatMap(a => a.values()),
      );
    }
  };

  const clearAll = () => {
    setPartners(new Map());
    storeData(partnersAsyncStorageKey, []);
  };

  const fetchPartnersFromAsyncStorage = async () => {
    const dataArray = await retrieveData<Partner[]>(partnersAsyncStorageKey);
    if (dataArray) {
      setPartners(mapPartners(dataArray));
      setPartnersLoading(false);
      const updatedData = Promise.all(
        dataArray.map(partner => {
          return syncPartner(partner, profile.id!);
        }),
      );
      updatedData
        .then(res => {
          setPartners(mapPartners(res));
          setPartnersLoading(false);
        })
        .catch(err => console.log(err));
    } else {
      setPartnersLoading(false);
    }
  };

  const updatePartner = (partner: Partner) => {
    setPartners(
      mapPartners(
        mapPartnersForAsyncStorage(partners).map(p => {
          if (p.id === partner.id) {
            return partner;
          }
          return p;
        }),
      ),
    );
  };

  const end = (partner: Partner, endDate: Date) => {
    setPartners(
      mapPartners(
        mapPartnersForAsyncStorage(partners).map(p => {
          if (p.id === partner.id) {
            p.inProgress = false;
            p.durationInDays = calculateInProgressPartnerDuration(p, endDate);
          }
          return p;
        }),
      ),
    );
  };

  const addPartner = (partner: Partner, _?: string) => {
    addPartnerToMap(partner, partners);
    setPartners(new Map(partners));

    syncPartner(partner, profile.id!).catch(err => console.log(err));
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
        syncPartner,
        end,
        updatePartner,
      }}>
      {children}
    </PartnerContext.Provider>
  );
};

export {PartnerContextProvider, PartnerContext};
