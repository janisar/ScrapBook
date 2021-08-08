import React, {FunctionComponent} from 'react';
import MapView, {Geojson} from 'react-native-maps';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as countries from '../data/countries/countries.geo.json';

type Props = {};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export const MapPage: FunctionComponent<Props> = () => {
  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Geojson geojson={{}} />
      </MapView>
    </SafeAreaView>
  );
};
