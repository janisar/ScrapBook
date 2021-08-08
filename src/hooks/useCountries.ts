import * as countries from '../data/countries/countries.geo.json';
import {useContext, useMemo} from 'react';
import {SelectItem} from '../models';
import {PartnerContext} from '../context/Context';

export const useCountries = (): [SelectItem[], any, any] => {
  const {partners} = useContext(PartnerContext);

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

  return [selectItems, conqueredCountries, unConqueredCountries];
};
