import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../components/atoms/Text';
import {Partner} from '../models';
import {InputComponent} from '../components/molecules/InputComponent';
import {Label} from '../components/atoms/Label';
import Button from '../components/molecules/Button';
import {useNavigation} from '@react-navigation/native';
import {PartnerContext} from '../context/Context';

type Props = {
  route: {params: {partner: Partner}};
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 2,
  },
  actionButton: {
    width: 120,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formComponent: {
    marginTop: 25,
  },
});

export const PartnerPage: FunctionComponent<Props> = ({route}) => {
  const {partner} = route.params;
  const [updatedPartner, setUpdatedPartner] = useState<Partner>(
    Partner.create(partner),
  );
  const navigation = useNavigation();
  const {partners, setPartners} = useContext(PartnerContext);

  const deletePartner = () => {
    setPartners(partners.filter(p => p.name !== partner.name));
    navigation.goBack();
  };

  const save = () => {
    setPartners([
      ...partners.filter(p => p.name !== partner.name),
      updatedPartner,
    ]);
    navigation.goBack();
  };

  const updateCountry = (country?: string) => {
    setUpdatedPartner(updatedPartner.withCountry(country));
  };

  useEffect(() => {
    navigation.setOptions({title: partner.name});
  }, [navigation, partner]);

  return (
    <View style={styles.page}>
      <View style={styles.info}>
        <Text extendedStyle={styles.formComponent}>{partner.name}</Text>
        <Text extendedStyle={styles.formComponent}>{partner.type}</Text>
        <Text extendedStyle={styles.formComponent}>
          {partner.durationInDays}
        </Text>
        <Label extendedStyle={styles.formComponent}>Where was she from?</Label>
        <InputComponent
          width={180}
          value={partner.country}
          onChange={(country: string) => updateCountry(country)}
          placeholder={'Country'}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button
          secondary={true}
          extendedStyle={styles.actionButton}
          onPress={deletePartner}
          label={'Delete'}
          inProgress={false}
          disabled={false}
        />
        <Button
          extendedStyle={styles.actionButton}
          onPress={save}
          label={'Save'}
          inProgress={false}
          disabled={false}
        />
      </View>
    </View>
  );
};
