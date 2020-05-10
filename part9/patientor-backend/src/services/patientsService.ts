import patients from '../../data/patients';

import { Patient, NewPatient, PublicPatient, Entry } from '../types';

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
  const newPatient: Patient = {
    ...patient,
    id: Math.random().toString(),
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const newEntry: Entry = {
    ...entry,
    id: Math.random().toString(),
  };

  patients.forEach((patient) => {
    if (patient.id === patientId) {
      patient.entries.push(newEntry);
    }
  });
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry
};
