import i18n from 'i18next';
import history from './en/history.json';
import common from './en/common.json';
import register from './en/register.json';
import profile from './en/profile.json';
import values from './en/values.json';
import scrapbook from './en/scrapbook.json';
import {initReactI18next} from 'react-i18next';

export const resources = {
  en: {
    history,
    common,
    register,
    profile,
    scrapbook,
    values,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['common', 'history', 'register', 'scrapbook', 'profile', 'values'],
  defaultNS: 'scrapbook',
  resources,
});
