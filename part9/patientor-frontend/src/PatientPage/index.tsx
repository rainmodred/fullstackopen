import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { Header, Icon, SemanticICONS, Button } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import './index.css';
import AddEntryModal, { EntryFormValues } from '../AddEntryModal';

import { addEntry, useStateValue, setPatient } from '../state';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id !== undefined) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entry/`,
          values,
        );
        dispatch(addEntry(id, newEntry));
      }

      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`,
      );
      dispatch(setPatient(patientFromApi));
    };
    if (patient && !patient.ssn) {
      fetchPatient();
    }
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

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
