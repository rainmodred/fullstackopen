import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Header, Icon } from 'semantic-ui-react';

type OccupationalEntryComponentProps = {
  entry: OccupationalHealthcareEntry;
};
const OccupationalEntryComponent: React.FC<OccupationalEntryComponentProps> = ({
  entry,
}) => {
  return (
    <div className="entry-details">
      <Header as="h3">
        {entry.date}
        <Icon name="stethoscope"></Icon>
        {entry.employerName}
      </Header>

      <p>{entry.description}</p>
    </div>
  );
};

export default OccupationalEntryComponent;
