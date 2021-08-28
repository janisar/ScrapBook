import {PartnerForm} from '../models/partner';
import moment from 'moment';

export const createPartnerUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function getDurationInDays(form: PartnerForm): number {
  if (form.inProgress) {
    return Math.abs(
      moment(form.startDate, 'DD-MM-YYYY').diff(new Date(), 'days'),
    );
  }
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
