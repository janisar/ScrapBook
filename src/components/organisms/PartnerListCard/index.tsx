import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Partner} from '../../../models';

type Props = {
  allPartners: Partner[];
  partner: Partner;
};

const styles = (width: string = '40%') =>
  StyleSheet.create({
    wrapper: {
      marginTop: 30,
      backgroundColor: '#bababa',
      borderRadius: 50,
      maxHeight: 40,
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
    },
    partnerLabel: {
      position: 'absolute',
      marginLeft: 4,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: 'white',
      minWidth: 120,
    },
    progressBar: {
      backgroundColor: 'purple',
      width: width,
      height: 30,
      zIndex: -1,
      borderRadius: 50,
    },
  });

const partnersSort = (p1: Partner, p2: Partner): number => {
  return p2.durationInDays! > p1.durationInDays! ? 1 : -1;
};

export const PartnerListCard: FunctionComponent<Props> = ({
  partner,
  allPartners,
}) => {
  const longest = [...allPartners].sort(partnersSort)[0].durationInDays;
  const width = (partner.durationInDays! * 100) / longest!;
  const style = styles(`${width}%`);
  return (
    <View style={style.wrapper}>
      <Text style={style.partnerLabel}>{partner.name}</Text>
      <View style={style.progressBar} />
    </View>
  );
};
