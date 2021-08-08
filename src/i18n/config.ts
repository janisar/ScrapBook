import i18n from 'i18next';
import history from './en/history.json';
import common from './en/common.json';
import register from './en/register.json';
import {initReactI18next} from 'react-i18next';

export const resources = {
  en: {
    history,
    common,
    register,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['common', 'history', 'register'],
  resources,
});
