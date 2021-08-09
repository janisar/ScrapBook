export type SelectItem = {
  label: string;
  value: number | string;
};

export enum Sex {
  Male,
  Female,
}

export enum Mode {
  LAST_YEAR,
  ALL_TIME,
}

export abstract class Synchronise {
  id?: string;
  synced?: boolean;

  protected constructor(id: string) {
    this.id = id;
    this.synced = false;
  }
}
