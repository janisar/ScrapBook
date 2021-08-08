import React, {FunctionComponent} from 'react';
import MapView, {Geojson} from 'react-native-maps';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useCountries} from '../hooks/useCountries';

type Props = {};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export const MapPage: FunctionComponent<Props> = () => {
  const [, conquered, unConquered] = useCountries();

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={0}
        zoomEnabled={false}
        maxZoomLevel={0}>
        <Geojson
          geojson={unConquered}
          strokeColor="#FF6D6A"
          fillColor="#FF6D6A"
          strokeWidth={2}
        />
        <Geojson
          geojson={conquered}
          strokeColor="green"
          fillColor="green"
          strokeWidth={2}
        />
      </MapView>
    </SafeAreaView>
  );
};
