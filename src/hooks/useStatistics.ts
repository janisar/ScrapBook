import {usePartners} from './usePartners';
import {useLoginUser} from './useLoginUser';
import {useEffect, useState} from 'react';
import * as allTime from '../data/all-time/index.json';
import * as lastYear from '../data/past-year/index.json';
import {Mode} from '../models';

const getAgeGroup = (age: number): string => {
  if (age >= 70) {
    return 'age_70_inf';
  }
  if (age >= 65) {
    return '65_69';
  }
  if (age >= 60) {
    return '60_64';
  }
  if (age >= 55) {
    return '55_59';
  }
  if (age >= 50) {
    return '50_54';
  }
  if (age >= 45) {
    return '45_49';
  }
  if (age >= 40) {
    return '40_44';
  }
  if (age >= 35) {
    return '35_39';
  }
  if (age >= 30) {
    return '30_34';
  }
  if (age >= 25) {
    return '25_29';
  }
  if (age >= 21) {
    return '21_24';
  } else {
    return '18_20';
  }
};

const getAgeGroupPastYear = (age: number): string => {
  if (age >= 35) {
    return '35_44';
  }
  if (age >= 25) {
    return '25_34';
  }
  return '18_24';
};

const getSex = (sex: string | undefined): string => {
  if (sex === 'M') {
    return 'male';
  }
  return 'female';
};

function calc(array: number[], i1: number, i2: number): number {
  let result = 0;

  array.slice(i1, i2 + 1).forEach(element => {
    result += element;
  });

  return Math.round(result * 100) / 100;
}

export const useStatistics = (mode: Mode): [number, number] => {
  const [stats, setStats] = useState<number>(0);
  const [pastYear, setPastYear] = useState<number>(0);
  const [partners] = usePartners();
  const [profile] = useLoginUser();

  useEffect(() => {
    setStats(
      allTime.data[`${getSex(profile?.sex)}_${getAgeGroup(profile?.age)}`][
        partners.length
      ],
    );
  }, [profile, partners]);

  useEffect(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    const lastYearPartners = partners.filter(p => {
      return new Date(p.startDate!) > today;
    }).length;
    const data =
      lastYear.data[
        `${getSex(profile?.sex)}_${getAgeGroupPastYear(profile?.age)}`
      ];
    setPastYear(calc(data, lastYearPartners + 1, data.length));
  }, [mode]);

  return [stats, pastYear];
};
