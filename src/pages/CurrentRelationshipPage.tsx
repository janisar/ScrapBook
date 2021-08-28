import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {PartnerContext} from '../context/PartnerContext';
import {Partner} from '../models/partner';
import {InProgressPartnerCard} from '../components/organisms/InProgressPartnerCard';

export const CurrentRelationshipPage: FunctionComponent = () => {
  const [inProgressPartners, setInProgress] = useState<Partner[] | undefined>();
  const {partners} = useContext(PartnerContext);

  useEffect(() => {
    setInProgress(
      Array.from(partners.values())
        .flatMap(a => a)
        .filter(partner => partner.inProgress),
    );
  }, [partners]);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 40}}>
      {inProgressPartners?.map(partner => {
        return (
          <InProgressPartnerCard currentPartner={partner} key={partner.id} />
        );
      })}
    </ScrollView>
  );
};
