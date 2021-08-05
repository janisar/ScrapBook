import {useContext, useEffect, useState} from 'react';
import {Partner} from '../models';
import {retrieveData} from '../storage/AsyncStorage';
import {partnersAsyncStorageKey} from '../context/reducers/partnerReducer';
import {PartnerContext} from '../context/Context';

export const usePartners = (): [Partner[]] => {
  const {partners, setPartners} = useContext(PartnerContext);
  const [asyncData, setAsyncData] = useState<Partner[]>([]);

  useEffect(() => {
    setPartners(partners);
  }, [partners, setPartners]);

  useEffect(() => {
    fetchPartnersFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (!partners || partners.length === 0) {
      setPartners(asyncData);
    }
  }, [asyncData, partners]);

  const fetchPartnersFromAsyncStorage = async () => {
    const data = await retrieveData<Partner[]>(partnersAsyncStorageKey);
    console.log(data);
    if (data) {
      setAsyncData(data);
      setPartners(data)
    }
  };

  return [partners];
};
