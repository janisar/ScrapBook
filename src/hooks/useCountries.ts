import * as countries from '../data/countries/countries.geo.json';
import {useContext, useMemo} from 'react';
import {SelectItem} from '../models';
import {PartnerContext} from '../context/PartnerContext';

const pointInPolygonNested = require('point-in-polygon');

export const getCountryByCoordinates = (coordinates: {
  latitude: number;
  longitude: number;
}): SelectItem | null => {
  const res = countries.features.find(feature => {
    return feature.geometry.coordinates.some(p => {
      return pointInPolygonNested(
        [coordinates.longitude, coordinates.latitude],
        [].concat(...p),
      );
    });
  });
  if (res) {
    return {label: res.properties.name, value: res.id};
  } else {
    return null;
  }
};

export const useCountries = (): [SelectItem[], any, any, boolean] => {
  const {partners} = useContext(PartnerContext);

  const canShow = partners.some(p => p.country);
  const selectItems: SelectItem[] = useMemo<SelectItem[]>(() => {
    return countries.features.map(feature => ({
      value: feature.id,
      label: feature.properties.name,
    }));
  }, []);

  const conqueredCountries = useMemo(() => {
    const countryIds = partners.map(p => p.country);

    const c = {...countries};

    c.features = c.features.filter(feature => countryIds.includes(feature.id));
    return c;
  }, [partners]);

  const unConqueredCountries = useMemo(() => {
    const countryIds = partners.map(p => p.country);

    const c = {...countries};

    c.features = c.features.filter(feature => !countryIds.includes(feature.id));
    return c;
  }, [partners]);

  return [selectItems, conqueredCountries, unConqueredCountries, canShow];
};
