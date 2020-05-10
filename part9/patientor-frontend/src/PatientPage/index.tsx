import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import './index.css';

const PatientPage: React.FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`,
      );

      setPatient(patientFromApi);
    };
    fetchPatient();
  }, [id]);

  let gName: SemanticICONS = 'mars';
  if (patient) {
    const { gender } = patient;

    if (gender === 'male') {
      gName = 'mars';
    }
    if (gender === 'female') {
      gName = 'venus';
    }
    if (gender === 'other') {
      gName = 'genderless';
    }
  }

  return (
    <div>
      {patient ? (
        <>
          <Header as="h2">
            {patient.name} <Icon name={gName}></Icon>
          </Header>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <Header as="h3">entries</Header>
          {patient.entries.map((entry) => {
            return <EntryDetails key={entry.id} entry={entry} />;
          })}
        </>
      ) : null}
    </div>
  );
};

export default PatientPage;
