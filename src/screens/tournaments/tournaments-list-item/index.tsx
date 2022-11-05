import React from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import H6 from '../../../components/H6';
import { TournamentDetails } from '../../../types/tournament';
import { ButtonGroup } from './styles';

interface TournamentListItemProps {
  tournament: TournamentDetails;
  handleEdit: () => void;
  handleDelete: () => void;
}

const formatDate = (stringDate: string) => {
  const date = new Date(stringDate);

  return `${date.toLocaleDateString('en-GB')}, ${date.toLocaleTimeString(
    'en-GB'
  )}`;
};

const TournamentListItem: React.FC<TournamentListItemProps> = ({
  tournament,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Card>
      <H6>{tournament.name}</H6>
      <span className="text-sm">Organizer: {tournament.organizer}</span>
      <span className="text-sm">Game: {tournament.game}</span>
      <span className="text-sm">
        Participants: {tournament.participants.current} /{' '}
        {tournament.participants.max}
      </span>
      <span className="text-sm">Start: {formatDate(tournament.startDate)}</span>

      <ButtonGroup>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
    </Card>
  );
};

export default TournamentListItem;
