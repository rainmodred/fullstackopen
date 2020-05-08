export interface Diagnose {
  code: string;
  name: string;
  lating?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface NewPatient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
