import React, { useState } from 'react';
import { Modal, Segment, Dropdown } from 'semantic-ui-react';

import { EntryType } from '../types';
import AddHealthCheckEntryForm, {
  HealthCheckEntryFormValues,
} from './AddHealthCheckEntryForm';
import AddHospitalEntryForm, {
  HospitalEntryFormValues,
} from './AddHospitalEntryForm';
import AddOccupationalEntryForm, {
  OccupationalEntryValues,
} from './AddOccupationalEntryForm';

export type EntryFormValues =
  | HealthCheckEntryFormValues
  | OccupationalEntryValues
  | HospitalEntryFormValues;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export type EntryOption = {
  key: number;
  text: EntryType;
  value: EntryType;
};

const entryOptions: EntryOption[] = [
  {
    key: 0,
    text: EntryType.Hospital,
    value: EntryType.Hospital,
  },
  {
    key: 1,
    text: EntryType.HealthCheck,
    value: EntryType.HealthCheck,
  },
  {
    key: 2,
    text: EntryType.OccupationalHealthcare,
    value: EntryType.OccupationalHealthcare,
  },
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entry, setEntry] = useState<string>(EntryType.HealthCheck);

  const handleChange = (e: React.SyntheticEvent<HTMLElement>, data: any) => {
    setEntry(data.value);
  };

  const renderForm = () => {
    switch (entry) {
      case EntryType.HealthCheck:
        return (
          <AddHealthCheckEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
          ></AddHealthCheckEntryForm>
        );
      case EntryType.Hospital:
        return (
          <AddHospitalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
          ></AddHospitalEntryForm>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <AddOccupationalEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
          ></AddOccupationalEntryForm>
        );

      default:
        return null;
    }
  };

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Add a new entry
        <Dropdown
          style={{ fontSize: '1.1rem' }}
          options={entryOptions}
          selection
          value={entry}
          onChange={handleChange}
        ></Dropdown>
      </Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {renderForm()}
        {/* <AddEntryForm onSubmit={onSubmit} onCancel={onClose} /> */}
      </Modal.Content>
    </Modal>
  );
};
export default AddEntryModal;
