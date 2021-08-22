import { mapPartners, mapPartnersForAsyncStorage } from "./partners";
import {Partner} from '../models/partner';

describe('partners util test', () => {
  it('should map for async storage', () => {
    const map = new Map();
    const p = new Partner();
    p.name = 'J';
    p.type = '1';
    p.startDate = new Date().toDateString();
    map.set(2020, [p]);
    const result = mapPartnersForAsyncStorage(map);
    expect(result.length).toBe(1);
  });

  it("should sort map by year", () => {
    const p = new Partner();
    p.name = 'J';
    p.type = '1';
    p.startDate = new Date().toDateString();
    const p2 = new Partner();
    p2.name = 'J';
    p2.type = '1';
    p2.startDate = new Date('01-01-2011').toDateString();
    const res = mapPartners([p, p2]);
    console.log(res);
  });
});
