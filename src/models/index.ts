export type SelectItem = {
  label: string;
  value: number;
};

export type PartnerForm = {
  name?: string;
  type?: string;
  duration?: number;
  durationUnit?: number;
  startDate?: Date;
  inProgress?: boolean;
};

export function getDurationInDays(form: any): number {
  switch (form.durationUnit) {
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

export class Partner {
  name?: string;
  type?: string;
  durationInDays?: number;
  startDate?: Date;
  inProgress?: boolean;
  country?: string;

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
    return result;
  };

  withCountry(country?: string): Partner {
    this.country = country;
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
      p1.startDate === p2.startDate
    );
  }
}

export enum Sex {
  Male,
  Female,
}

export enum Mode {
  LAST_YEAR,
  ALL_TIME,
}
