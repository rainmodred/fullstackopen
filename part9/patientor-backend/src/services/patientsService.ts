import patients from '../../data/patients';

import { Patient, NewPatient, PublicPatient } from '../types';

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p: Patient) => p.id === id);
  if (!patient) {
    return undefined;
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: Math.random().toString(),
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatient,
};
