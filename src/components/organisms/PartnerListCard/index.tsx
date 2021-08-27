import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Partner} from '../../../models/partner';
import {getPartnerDuration} from '../../../utils/dateUtils';
import {Screens} from '../../../constants';

type Props = {
  allPartners: Partner[];
  partner: Partner;
};

const styles = (width: string = '40%') =>
  StyleSheet.create({
    wrapper: {
      marginTop: 10,
      backgroundColor: '#bababa',
      marginBottom: 10,
      borderRadius: 50,
      maxHeight: 40,
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowRadius: 2,
      shadowColor: 'gray',
      shadowOpacity: 1,
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
      backgroundColor: '#b665c1',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowRadius: 1,
      shadowOpacity: 1,
      shadowColor: 'gray',
      width: width,
      height: 30,
      zIndex: -1,
      borderRadius: 50,
    },
    hookup: {
      justifyContent: 'center',
      height: 30,
      borderRadius: 50,
    },
    rightLabel: {
      position: 'absolute',
      right: 0,
      fontSize: 11,
      marginRight: 8,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: 'white',
    },
  });

const partnersSort = (p1: Partner, p2: Partner): number => {
  return p2.durationInDays! > p1.durationInDays! ? 1 : -1;
};

function getWidth(width: number, type?: string): number {
  if (type === '1' || type === '2') {
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

  function getWidth1() {
    if (partner.durationInDays! < 14) {
      return 0;
    }
    return (partner.durationInDays! * 100) / longest!;
  }

  const width = getWidth1();
  const style = styles(`${getWidth(width, partner.type)}%`);
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={style.wrapper}
      onPress={() => nav.navigate(Screens.Partner, {partner: partner})}>
      <Text style={style.partnerLabel}>{partner.name}</Text>
      <View style={partner.type === '3' ? style.hookup : style.progressBar} />
      <Text style={style.rightLabel}>{getPartnerDuration(partner)}</Text>
    </TouchableOpacity>
  );
};
