import React from 'react';
import HospitalEntryComponent from './HospitalEntryComponent';
import OccupationalEntryComponent from './OccupationalEntryComponent';
import HealthCheckEntryComponent from './HealthCheckEntryComponent';
import { Entry } from '../types';

type EntryDetailsProps = {
  entry: Entry;
};

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryComponent entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryComponent entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
