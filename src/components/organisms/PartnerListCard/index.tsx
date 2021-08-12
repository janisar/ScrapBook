import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Partner} from '../../../models/partner';

type Props = {
  allPartners: Partner[];
  partner: Partner;
};

const styles = (width: string = '40%', colour: string) =>
  StyleSheet.create({
    wrapper: {
      marginTop: 30,
      backgroundColor: '#bababa',
      marginBottom: 10,
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
      backgroundColor: colour,
      width: width,
      height: 30,
      zIndex: -1,
      borderRadius: 50,
    },
  });

const partnersSort = (p1: Partner, p2: Partner): number => {
  return p2.durationInDays! > p1.durationInDays! ? 1 : -1;
};

function getColour(type: string | undefined): string {
  switch (type) {
    case '0':
      return 'teal';
    case '1':
      return 'purple';
    case '2':
      return 'teal';
    case '3':
      return 'teal';
    case '4':
    default:
      return 'teal';
  }
}

function getWidth(width: number, type?: string): number {
  if (type === '1') {
    return width;
  } else {
    return 100;
  }
}

export const PartnerListCard: FunctionComponent<Props> = ({
  partner,
  allPartners,
}) => {
  const longest = [...allPartners].sort(partnersSort)[0].durationInDays;
  const width = (partner.durationInDays! * 100) / longest!;
  const colour = getColour(partner.type);
  const style = styles(`${getWidth(width, partner.type)}%`, colour);
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={style.wrapper}
      onPress={() => nav.navigate('Partner', {partner: partner})}>
      <Text style={style.partnerLabel}>{partner.name}</Text>
      <View style={style.progressBar} />
    </TouchableOpacity>
  );
};
