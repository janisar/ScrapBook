import {useContext, useEffect, useState} from 'react';
import * as allTime from '../data/all-time/index.json';
import * as lastYear from '../data/past-year/index.json';
import {Mode} from '../models';
import {PartnerContext} from '../context/PartnerContext';
import {ProfileContext} from '../context/UserContext';
import {mapPartnersForAsyncStorage} from '../utils/partners';

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

function getYear(date: string | undefined | Date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  let birthYear: string | undefined = date?.match('[\\d]{4}')?.find(m => m);
  if (!birthYear) {
    birthYear = '1995';
  }
  return birthYear;
}

function getAge(date: string | undefined) {
  let birthYear = getYear(date);
  return new Date().getFullYear() - (+birthYear as number);
}

export const useStatistics = (mode: Mode): [number, number] => {
  const [stats, setStats] = useState<number>(0);
  const [pastYear, setPastYear] = useState<number>(0);
  const {partners} = useContext(PartnerContext);
  const {profile} = useContext(ProfileContext);

  useEffect(() => {
    setStats(
      allTime.data[
        `${getSex(profile?.sex)}_${getAgeGroup(getAge(profile.birthDate))}`
      ][mapPartnersForAsyncStorage(partners).length],
    );
  }, [profile, partners]);

  useEffect(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    const lastYearPartners = mapPartnersForAsyncStorage(partners).filter(p => {
      return new Date(p.startDate!) > today;
    }).length;
    console.log(lastYearPartners);
    const data =
      lastYear.data[
        `${getSex(profile?.sex)}_${getAgeGroupPastYear(
          getAge(profile.birthDate),
        )}`
      ];
    const result = calc(data, lastYearPartners + 1, data.length);
    console.log(result);
    setPastYear(result);
  }, [mode]);

  return [stats, pastYear];
};
