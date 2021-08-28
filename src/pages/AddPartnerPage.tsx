import React, {FunctionComponent, useContext, useState} from 'react';
import {HistoryEntryForm} from '../containers/forms/HistoryEntryForm';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Partner, PartnerForm} from '../models/partner';
import {ProfileContext} from '../context/UserContext';
import {PartnerContext} from '../context/PartnerContext';
import {useTranslation} from 'react-i18next';
import dateFormat from 'dateformat';

type Props = {};

const initialState = {
  startDate: dateFormat(new Date(), 'dd-mm-yyyy'),
};
export const AddPartnerPage: FunctionComponent<Props> = () => {
  const [formValue, setFormValue] = useState<PartnerForm>(initialState);
  const {profile} = useContext(ProfileContext);
  const {addPartner} = useContext(PartnerContext);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const setValue = (field: string) => (value: string | Date | boolean) => {
    setFormValue({...formValue, [`${field}`]: value} as Partner);
  };

  const save = () => {
    const partner = Partner.createFromPartnerForm(formValue);
    if (partner.isValid()) {
      addPartner(partner, profile.id);
      setFormValue(initialState);
      navigation.goBack();
    } else {
      Alert.alert('Error', t('addNewPartnerError'));
    }
  };

  return (
    <HistoryEntryForm setFormValue={setValue} save={save} form={formValue} />
  );
};
