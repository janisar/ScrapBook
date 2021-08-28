import {Partner} from '../models/partner';
import {getYearFromDate} from './dateUtils';
import moment from 'moment';

export function mapPartnersForAsyncStorage(map: Map<number, Partner[]>) {
  return Array.from(map.values()).flatMap(a => a);
}

export const calculateInProgressPartnerDuration = (
  partner: Partner,
  endDate: Date,
): number => {
  return Math.abs(
    moment(partner.startDate, 'MM-DD-YYYY').diff(endDate, 'days'),
  );
};

export const mapPartners = (
  partnersList: Partner[],
): Map<number, Partner[]> => {
  const result = new Map<number, Partner[]>();
  partnersList.forEach(p => {
    addPartnerToMap(p, result);
  });
  return result;
};

export function addPartnerToMap(p: Partner, result: Map<number, Partner[]>) {
  const year = getYearFromDate(p.startDate);
  if (year) {
    if (!result.has(year)) {
      result.set(year, []);
    }
    result.get(year)?.push(Partner.create(p));
  }
}
