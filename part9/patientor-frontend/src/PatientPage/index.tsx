import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`,
      );
      console.log(patientFromApi);
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
      gName = 'mercury';
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
        </>
      ) : null}
    </div>
  );
};

export default PatientPage;
