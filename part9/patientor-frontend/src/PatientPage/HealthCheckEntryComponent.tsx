import React from 'react';
import { Icon, Header, SemanticCOLORS } from 'semantic-ui-react';
import { HealthCheckEntry, HealthCheckRating } from '../types';

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

type HealthCheckEntryComponentProps = {
  entry: HealthCheckEntry;
};

const HealthCheckEntryComponent: React.FC<HealthCheckEntryComponentProps> = ({
  entry,
}) => {
  let color: SemanticCOLORS = 'green';
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = 'green';
      break;
    case HealthCheckRating.LowRisk:
      color = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      color = 'pink';
      break;
    case HealthCheckRating.CriticalRisk:
      color = 'red';
      break;
    default:
      return assertNever(entry.healthCheckRating);
  }

  return (
    <div className="entry-details">
      <Header as="h3">
        {entry.date}
        <Icon name="doctor"></Icon>
      </Header>
      <p>{entry.description}</p>
      <Icon name="heart" color={color}></Icon>
    </div>
  );
};

export default HealthCheckEntryComponent;
