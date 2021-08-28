import {getDurationInDays} from './index';
import {PartnerForm} from '../models/partner';

describe('Utils test', () => {
  it('should create duration', () => {
    const form = {
      startDate: '28-02-2021',
      inProgress: true,
    } as PartnerForm;

    const days = getDurationInDays(form);
    expect(days).toBeGreaterThan(0);
  });
});
