import {getDurationInDays, uuidv4} from '../utils';
import {Synchronise} from './index';

export type PartnerForm = {
  name?: string;
  type?: string;
  duration?: number;
  durationUnit?: number;
  startDate?: Date;
  inProgress?: boolean;
};

export class Partner extends Synchronise {
  name?: string;
  type?: string;
  durationInDays?: number;
  startDate?: Date;
  inProgress?: boolean;
  country?: string;
  userId?: string;

  constructor() {
    super(uuidv4());
  }

  static createFromPartnerForm(form: PartnerForm): Partner {
    const partner = new Partner();
    partner.name = form.name;
    partner.type = form.type;
    partner.durationInDays = getDurationInDays(form);
    partner.startDate = form.startDate;
    partner.inProgress = form.inProgress;
    return partner;
  }

  static create(partner: Partner) {
    const result = new Partner();
    result.name = partner.name;
    result.type = partner.type;
    result.durationInDays = partner.durationInDays;
    result.startDate = partner.startDate;
    result.inProgress = partner.inProgress;
    result.country = partner.country;
    return result;
  }

  withCountry(country?: string): Partner {
    this.country = country;
    return this;
  }

  withSynced(): Partner {
    this.synced = true;
    return this;
  }

  isValid() {
    return this.name && this.type && this.durationInDays && this.startDate;
  }

  static equals(p1: Partner, p2: Partner): boolean {
    return (
      p1.durationInDays === p2.durationInDays &&
      p1.name === p2.name &&
      p1.type === p2.type &&
      p1.startDate === p2.startDate &&
      p1.id === p2.id
    );
  }
}
