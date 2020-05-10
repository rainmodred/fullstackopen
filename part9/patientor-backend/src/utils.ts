import { NewPatient, Gender, NewEntry, HealthCheckRating } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOcupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect of missing gender: ' + gender);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOcupation(object.occupation),
    gender: parseGender(object.gender),
  };
};

const parseString = (string: any, name: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing ${name}: ${string}`);
  }
  return string;
};


const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating < HealthCheckRating.Healthy && healthCheckRating > HealthCheckRating.CriticalRisk || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect of missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};


const toNewEntry = (object: any): NewEntry => {
  const description = parseString(object.description, 'description');
  const date = parseDate(object.date);
  const specialist = parseString(object.specialist, 'specialsit');

  switch (object.type) {
    case 'OccupationalHealthcare':
      return {
        ...object,
        description,
        date,
        specialist,
        employerName: parseString(object.employerName, 'employerName')
      };
    case 'HealthCheck':
      return {
        ...object,
        description,
        date,
        specialist,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'Hospital':
      return {
        ...object,
        description,
        date,
        specialist,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria, 'criteria')
        }
      };
    default:
      throw new Error('Incorrect entry type ' + object.type);

  }
};

// const toNewEntry = (object: any): NewEntry => {
//   return {
//     description: parseDescription(),
//     date: parseDate(object.date),
//     specialist: parseString(),


//   }
// }

export { toNewPatient, toNewEntry };
