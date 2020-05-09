import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';
import { useStateValue } from '../state';

const PatientPage: React.FC = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [{ diagnoses }, ,] = useStateValue();

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
          <Header as="h3">entries</Header>
          {patient.entries.map((entry) => {
            return (
              <div key={entry.id}>
                <p>
                  {entry.date} {entry.description}
                </p>
                <ul className="ui list">
                  {entry.diagnosisCodes
                    ? entry.diagnosisCodes.map((code) => {
                        const diagnosis = diagnoses.get(code);

                        return (
                          <li key={code}>
                            {code} {diagnosis?.name}
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default PatientPage;
