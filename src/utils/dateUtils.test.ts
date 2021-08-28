import {getYearFromDate} from './dateUtils';

describe('date util tests', () => {
  it('should get year from string date', () => {
    const year = getYearFromDate('28-08-2021');
    expect(year).toBe(2021);
  });
});
