import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import MapView, {Geojson} from 'react-native-maps';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {getCountryByCoordinates, useCountries} from '../hooks/useCountries';
import {PartnerContext} from '../context/PartnerContext';
import {SelectItem} from '../models';
import {PartnerMapModal} from '../components/organisms/PartnerMapModal';
import {mapPartnersForAsyncStorage} from '../utils/partners';
const {height, width} = Dimensions.get('window');
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
type Props = {};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export const MapPage: FunctionComponent<Props> = () => {
  const [mounted, setMounted] = useState(false);
  const [, conquered, unConquered, canShow] = useCountries();
  const {partners} = useContext(PartnerContext);
  const [selectedCountry, setSelectedCountry] = useState<
    SelectItem | undefined
  >(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return (
    <SafeAreaView>
      {!canShow &&
        mounted &&
        Alert.alert(
          'Add some data',
          'You can add origin country to you partners on your history page',
        )}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: 20.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        minZoomLevel={0}
        zoomEnabled={true}
        onPress={e => {
          const country = getCountryByCoordinates(e.nativeEvent.coordinate);
          if (
            country &&
            mapPartnersForAsyncStorage(partners).find(
              p => p.country === country.value,
            )
          ) {
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
          strokeColor="#999999FF"
          fillColor="purple"
          strokeWidth={2}
        />
      </MapView>
      {selectedCountry && modalVisible && (
        <PartnerMapModal
          country={selectedCountry}
          partners={mapPartnersForAsyncStorage(partners)}
          onClose={() => setModalVisible(false)}
        />
      )}
    </SafeAreaView>
  );
};
