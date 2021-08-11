import React, {FunctionComponent} from 'react';
import MapView, {Geojson} from 'react-native-maps';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {useCountries} from '../hooks/useCountries';

type Props = {};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export const MapPage: FunctionComponent<Props> = () => {
  const [, conquered, unConquered, canShow] = useCountries();

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
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={0}
        zoomEnabled={true}
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
    </SafeAreaView>
  );
};
