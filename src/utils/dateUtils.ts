import {Partner} from '../models/partner';

const calculateTiming = (d: number) => {
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (d) {
    if (d >= 365) {
      years++;
      d -= 365;
    } else if (d >= 30) {
      months++;
      d -= 30;
    } else if (d >= 7) {
      weeks++;
      d -= 7;
    } else {
      days++;
      d--;
    }
  }
  return {
    years,
    months,
    weeks,
    days,
  };
};

export const getPartnerDuration = (partner: Partner | undefined): string => {
  if (!partner) {
    return '';
  }
  const {years, months, weeks, days} = calculateTiming(partner.durationInDays!);
  if (years) {
    return years + (years > 1 ? ' years' : ' year');
  } else if (months) {
    return months + (months > 1 ? ' months' : ' month');
  } else if (weeks) {
    return weeks + (weeks > 1 ? ' weeks' : ' week');
  }
  return days + (days > 1 ? ' days' : ' day');
};

export const getYearFromDate = (
  date: Date | string | undefined,
): number | undefined => {
  if (!date) {
    return undefined;
  }
  return new Date(date).getFullYear();
};
