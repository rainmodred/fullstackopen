import patients from '../../data/patients.ts';

import { Patient, NewPatient, PublicPatient } from '../types';

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PublicPatient => {

  const patient = patients.find((p: Patient) => p.id === id);
  console.log(patient);
  return patient;
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
  getPatient,
};
