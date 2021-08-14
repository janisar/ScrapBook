import React, {FunctionComponent, useContext, useState} from 'react';
import MapView, {Geojson} from 'react-native-maps';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {getCountryByCoordinates, useCountries} from '../hooks/useCountries';
import {PartnerContext} from '../context/PartnerContext';
import {SelectItem} from '../models';
import {PartnerMapModal} from '../components/organisms/PartnerMapModal';

type Props = {};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export const MapPage: FunctionComponent<Props> = () => {
  const [, conquered, unConquered, canShow] = useCountries();
  const {partners} = useContext(PartnerContext);
  const [selectedCountry, setSelectedCountry] = useState<
    SelectItem | undefined
  >(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <SafeAreaView>
      {!canShow &&
        Alert.alert(
          'Add some data',
          'You can add origin country to you partners on your history page',
        )}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: 20.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={0}
        zoomEnabled={true}
        onPress={e => {
          const country = getCountryByCoordinates(e.nativeEvent.coordinate);
          if (country && partners.find(p => p.country === country.value)) {
            setSelectedCountry(country);
            setModalVisible(true);
          } else {
            setModalVisible(false);
          }
        }}
        maxZoomLevel={1}>
        <Geojson
          geojson={unConquered}
          strokeColor="gray"
          fillColor="gray"
          strokeWidth={2}
        />
        <Geojson
          geojson={conquered}
          strokeColor="purple"
          fillColor="purple"
          strokeWidth={2}
        />
      </MapView>
      {selectedCountry && modalVisible && (
        <PartnerMapModal
          country={selectedCountry}
          partners={partners}
          onClose={() => setModalVisible(false)}
        />
      )}
    </SafeAreaView>
  );
};
