import {useContext, useEffect, useState} from 'react';
import {Partner} from '../models';
import {retrieveData} from '../storage/AsyncStorage';
import {AppState} from '../context/Context';
import {partnersAsyncStorageKey} from '../context/reducers/partnerReducer';

export const usePartners = (): [Partner[]] => {
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

  return [p];
};
