import React, {FunctionComponent, useContext, useState} from 'react';
import {HistoryEntryForm} from '../containers/forms/HistoryEntryForm';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Partner, PartnerForm} from '../models/partner';
import {ProfileContext} from '../context/UserContext';
import {PartnerContext} from '../context/PartnerContext';

type Props = {};

export const AddPartnerPage: FunctionComponent<Props> = () => {
  const [formValue, setFormValue] = useState<PartnerForm>({});
  const {profile} = useContext(ProfileContext);
  const {addPartner} = useContext(PartnerContext);
  const navigation = useNavigation();

  const setValue = (field: string) => (value: string | Date | boolean) => {
    setFormValue({...formValue, [`${field}`]: value} as Partner);
  };

  const save = () => {
    const partner = Partner.createFromPartnerForm(formValue);

    if (partner.isValid()) {
      addPartner(partner, profile.id);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill all the fields');
    }
  };

  return (
    <HistoryEntryForm setFormValue={setValue} save={save} form={formValue} />
  );
};
