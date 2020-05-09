import { State } from './state';
import { Patient, Diagnosis } from '../types';

export type Action =
  | {
    type: 'SET_PATIENT_LIST';
    payload: Patient[];
  }
  | {
    type: 'ADD_PATIENT';
    payload: Patient;
  } | {
    type: 'SET_DIAGNOSIS_LIST';
    payload: Diagnosis[];
  };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnoses
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      const diagnoses = new Map();
      action.payload.forEach((diagosis) => {
        diagnoses.set(diagosis.code, diagosis);
      });
      return {
        ...state,
        diagnoses
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
