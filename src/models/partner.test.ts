import {Partner, PartnerForm} from './partner';

describe('Partner tests', () => {
  it('should create inProgress from form', () => {
    const partnerForm = {
      name: 'Moo',
      startDate: '01-01-2021',
      inProgress: true,
      type: '1',
      country: 'ALB',
    } as PartnerForm;
    const partner = Partner.createFromPartnerForm(partnerForm);
    expect(partner.durationInDays).toBeGreaterThan(0);
  });

  it('should create ended relationship', () => {
    const partnerForm = {
      name: 'Moo',
      startDate: '01-01-2021',
      inProgress: false,
      duration: 4,
      durationUnit: 2,
      type: '1',
      country: 'ALB',
    } as PartnerForm;
    const partner = Partner.createFromPartnerForm(partnerForm);
    expect(partner.durationInDays).toBeGreaterThan(0);
  });

  it('should create from existing partner', () => {
    const p = new Partner();
    p.type = '1';
    p.startDate = '01-01-2021';
    p.name = 'Moo';
    p.inProgress = true;

    const partner = Partner.create(p);
    console.log(partner);
  });
});
