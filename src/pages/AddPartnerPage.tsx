import React, {FunctionComponent, useContext, useState} from 'react';
import {HistoryEntryForm} from '../containers/forms/HistoryEntryForm';
import {Partner, PartnerForm} from '../models';
import {Alert} from 'react-native';
import {AppDispatch} from '../context/Context';
import {useNavigation} from '@react-navigation/native';

type Props = {};

export const AddPartnerPage: FunctionComponent<Props> = () => {
  const [formValue, setFormValue] = useState<PartnerForm>({});
  const dispatch = useContext(AppDispatch);
  const navigation = useNavigation();

  const setValue = (field: string) => (value: string | Date | boolean) => {
    setFormValue({...formValue, [`${field}`]: value} as Partner);
  };

  const save = () => {
    const partner = Partner.createFromPartnerForm(formValue);

    if (partner.isValid()) {
      dispatch({type: 'ADD_PARTNER', value: partner});
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill all the fields');
    }
  };

  return (
    <HistoryEntryForm setFormValue={setValue} save={save} form={formValue} />
  );
};
