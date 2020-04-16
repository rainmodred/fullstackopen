import patients from '../../data/patients.json';

import { Patient, NewPatient } from '../types';

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: Math.random().toString(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
