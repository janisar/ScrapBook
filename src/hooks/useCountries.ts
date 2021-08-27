import * as countries from '../data/countries/countries.geo.json';
import {useContext, useEffect, useMemo, useState} from 'react';
import {SelectItem} from '../models';
import {PartnerContext} from '../context/PartnerContext';
import {Partner} from '../models/partner';
import {mapPartnersForAsyncStorage} from '../utils/partners';

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
  const [partnersList, setPartnersList] = useState<Partner[]>([]);

  useEffect(() => {
    setPartnersList(mapPartnersForAsyncStorage(partners));
  }, [partners]);

  const canShow = partnersList.some(p => p.country);
  const selectItems: SelectItem[] = useMemo<SelectItem[]>(() => {
    return countries.features
      .map(feature => ({
        value: feature.id,
        label: feature.properties.name,
      }))
      .sort((c1, c2) => c1.label.localeCompare(c2.label));
  }, []);

  const conqueredCountries = useMemo(() => {
    const countryIds = partnersList.map(p => p.country);

    const c = {...countries};

    c.features = c.features.filter(feature => countryIds.includes(feature.id));
    return c;
  }, [partnersList]);

  const unConqueredCountries = useMemo(() => {
    const countryIds = partnersList.map(p => p.country);

    const c = {...countries};

    c.features = c.features.filter(feature => !countryIds.includes(feature.id));
    return c;
  }, [partnersList]);

  return [selectItems, conqueredCountries, unConqueredCountries, canShow];
};
