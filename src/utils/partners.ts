import {Partner} from '../models/partner';
import {getYearFromDate} from './dateUtils';

export function mapPartnersForAsyncStorage(map: Map<number, Partner[]>) {
  return Array.from(map.values()).flatMap(a => a);
}

export const calculateInProgressPartnerDuration = (
  partner: Partner,
  endDate: Date,
): number => {
  const diffTime = Math.abs(
    new Date(endDate).getTime() - new Date(partner.startDate!).getTime(),
  );
  console.log(diffTime)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const mapPartners = (
  partnersList: Partner[],
): Map<number, Partner[]> => {
  const result = new Map<number, Partner[]>();
  partnersList.forEach(p => {
    if (p.inProgress) {
      p.durationInDays = calculateInProgressPartnerDuration(p, new Date());
    }
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
    result.get(year)?.push(p);
  }
}
