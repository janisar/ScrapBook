import {PartnerForm} from '../models/partner';

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function getDurationInDays(form: PartnerForm): number {
  switch (form.durationUnit + '') {
    case '1':
      return form.duration!;
    case '2':
      return form.duration! * 7;
    case '3':
      return form.duration! * 30;
    case '4':
      return form.duration! * 365;
  }
  return 0;
}
