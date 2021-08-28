import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPartnerDuration} from '../../../utils/dateUtils';
import {InputSelect} from '../../molecules/InputSelect';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart, faClock} from '@fortawesome/free-solid-svg-icons';
import {LineChart} from 'react-native-chart-kit';
import {Happiness, Partner} from '../../../models/partner';
import {useTranslation} from 'react-i18next';
import {SelectItem} from '../../../models';
import moment from 'moment';
import {PartnerContext} from '../../../context/PartnerContext';

type Props = {
  currentPartner: Partner;
};

const styles = StyleSheet.create({
  card: {
    width: '85%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#e2e2e2',
    shadowOpacity: 1,
    shadowRadius: 10,
    marginTop: 40,
    padding: 20,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separatedRow: {
    paddingTop: 14,
    marginRight: 10,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#bfbfbf',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  update: {fontSize: 14, color: 'blue'},
  chart: {marginTop: 15, marginLeft: -20, paddingBottom: 10},
  slider: {backgroundColor: '#ff9a9a', height: 4},
  disabledSlider: {backgroundColor: '#828282', height: 4},
  track: {height: 4, backgroundColor: '#dcdcdc'},
});

type DataType = {
  labels: string[];
  datasets: {data: number[]; color: () => string}[];
};

const initialData = {
  datasets: [],
  labels: [],
};

export const InProgressPartnerCard: FunctionComponent<Props> = ({
  currentPartner,
}) => {
  const {} = useContext(PartnerContext);
  const {t} = useTranslation('values');
  const relationshipTypes: SelectItem[] = t('relationships', {
    returnObjects: true,
  });
  const {updatePartner} = useContext(PartnerContext);
  const [partner] = useState<Partner>(currentPartner);
  const [width, setWidth] = useState(200);
  const [type, setType] = useState<string>(currentPartner.type!);
  const [happinessEnabled, setHappinessEnabled] = useState(false);
  const [happiness, setHappiness] = useState<Happiness[]>(
    currentPartner.happiness || [],
  );
  const [happinessValue, setHappinessValue] = useState(
    happiness.length > 0 ? happiness[happiness.length - 1].value : 50,
  );

  const getData = (result: Happiness[]): DataType => {
    if (result && result.length > 0) {
      const start = new Date();
      const labels = result.map(h => {
        const diff = moment(start).diff(h.recordedAt, 'seconds');
        return moment().subtract(diff, 'seconds').fromNow();
      });
      return {
        labels: Array.from(labels),
        datasets: [
          {
            data: result?.map(val => val.value) || [],
            color: (opacity = 1) => `rgba(255, 154, 154, ${opacity})`,
          },
        ],
      };
    } else {
      return initialData;
    }
  };

  const [data, setData] = useState<DataType>(
    getData(currentPartner.happiness || []),
  );

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const add = useCallback(() => {
    const result = happiness || [];
    if (!happiness || happiness.length === 0) {
      result.push({
        value: happinessValue,
        recordedAt: new Date(),
      });
    } else {
      const diff = moment(new Date()).diff(
        happiness[happiness.length - 1].recordedAt,
        'minutes',
      );
      if (diff < 60) {
        result.pop();
      }
      result.push({
        value: happinessValue,
        recordedAt: new Date(),
      });
    }
    setData(getData(result));
    setHappiness(result);
    updatePartner(currentPartner.withHappiness(result));
  }, [happiness, happinessValue]);

  const updateHappiness = () => {
    setHappinessEnabled(!happinessEnabled);
    if (happinessEnabled) {
      add();
    }
  };

  return (
    <View
      onLayout={event => {
        setWidth(event.nativeEvent.layout.width);
      }}
      style={styles.card}
      key={partner.id}>
      <View style={styles.row}>
        <Text style={{fontSize: 18}}>{partner.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faClock} />
          <Text>
            {'  '}
            {getPartnerDuration(partner)}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 14}}>Type: </Text>
        <InputSelect
          width={160}
          onValueChange={value => {
            updatePartner({...partner, type: value} as Partner);
            setType(value);
          }}
          items={relationshipTypes}
          value={relationshipTypes.find(s => s.value === type)}
        />
      </View>
      <View style={styles.separatedRow}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 14}}>Happiness tracker{'   '}</Text>
          <FontAwesomeIcon icon={faHeart} size={14} color={'#ff2525'} />
          <Text style={{fontSize: 14, color: '#ff2525'}}>
            {' '}
            {happinessValue}
          </Text>
        </View>
        <TouchableOpacity onPress={updateHappiness}>
          <Text style={styles.update}>
            {happinessEnabled ? 'Save' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView scrollEnabled={false} style={{marginTop: 10}}>
        <MultiSlider
          min={0}
          enabledOne={happinessEnabled}
          max={100}
          values={
            !!happiness && happiness.length > 0
              ? [happiness[happiness.length - 1].value]
              : [50]
          }
          onValuesChange={val => {
            setHappinessValue(val[0]);
          }}
          selectedStyle={
            happinessEnabled ? styles.slider : styles.disabledSlider
          }
          trackStyle={styles.track}
          customMarker={() => {
            return (
              <FontAwesomeIcon
                icon={faHeart}
                size={26}
                color={happinessEnabled ? '#ff2525' : '#828282'}
              />
            );
          }}
        />
      </ScrollView>
      {!!happiness && happiness.length > 0 && (
        <LineChart
          style={styles.chart}
          data={data}
          fromZero={false}
          fromNumber={100}
          withDots={true}
          segments={5}
          verticalLabelRotation={10}
          hidePointsAtIndex={happiness
            .map((h, i) => i)
            .filter(i => i % 2 !== 0)}
          bezier
          width={width}
          withOuterLines={false}
          height={220}
          withShadow={true}
          withInnerLines={false}
          chartConfig={chartConfig}
        />
      )}
    </View>
  );
};
