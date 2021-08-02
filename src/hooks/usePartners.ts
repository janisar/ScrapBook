import {useContext, useEffect, useState} from 'react';
import {Partner} from '../models';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {AppState} from '../context/Context';

const partnersAsyncStorageKey = 'partners';

const sortChronologically = (p1: Partner, p2: Partner): number => {
  if (p1.startDate! < p2.startDate!) {
    return -1;
  } else {
    return 1;
  }
};

export const usePartners = (): [Partner[], (partner: Partner) => void] => {
  const {partners} = useContext(AppState);
  const [p, setPartners] = useState<Partner[]>(partners);
  const [asyncData, setAsyncData] = useState<Partner[]>([]);

  useEffect(() => {
    setPartners(partners);
  }, [partners]);

  useEffect(() => {
    fetchPartnersFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (!p || p.length === 0) {
      setPartners(asyncData);
    }
  }, [asyncData, p]);

  const fetchPartnersFromAsyncStorage = async () => {
    const data = await retrieveData<Partner[]>(partnersAsyncStorageKey);
    if (data) {
      setAsyncData(data);
    }
  };

  async function storePartner(partner: Partner) {
    let asyncPartners = await retrieveData<Partner[]>(partnersAsyncStorageKey);
    if (!asyncPartners) {
      asyncPartners = [];
    }
    asyncPartners.push(partner);
    await storeData(partnersAsyncStorageKey, asyncPartners);
  }

  const addPartner = async (partner: Partner) => {
    storePartner(partner);
    const result = [...p, partner];
    setPartners(result.sort(sortChronologically));
  };

  return [p, addPartner];
};
