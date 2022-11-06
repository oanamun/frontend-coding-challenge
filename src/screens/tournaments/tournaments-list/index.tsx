import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  fetchTournaments,
  editTournament,
  showErrorMessage,
  clearErrorMessage,
  deleteTournamentCall,
} from '../../../actions/tournaments';
import Button from '../../../components/Button';
import Grid from '../../../components/Grid';
import { RootState } from '../../../reducers';
import { TournamentState } from '../../../reducers/tournaments';
import { selectTournaments } from '../../../selectors/tournaments';
import TournamentListItem from '../tournaments-list-item';
import { Info } from './styles';
import { validateName } from './utils';

type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

const TournamentsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tournaments, status, errorMessage } = useSelector<
    RootState,
    TournamentState
  >(selectTournaments);

  useEffect(() => {
    getTournaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      dispatch(clearErrorMessage());
    }
  }, [errorMessage]);

  const getTournaments = () => {
    dispatch(fetchTournaments());
  };

  const onDelete = (id: string) => () => {
    const confirmation = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (confirmation) {
      dispatch(deleteTournamentCall(id));
    }
  };

  const onEdit = (id: string) => () => {
    const selectedTournament = tournaments.find(
      (tournament) => tournament.id === id
    );
    if (!selectedTournament) {
      return;
    }

    const newName =
      window.prompt('New tournament name:', selectedTournament.name)?.trim() ||
      '';
    if (newName === selectedTournament.name) {
      return;
    }

    const isValid = newName && validateName(newName);
    if (!isValid) {
      dispatch(showErrorMessage('The provided name is not valid'));
      return;
    }

    dispatch(editTournament(id, newName));
  };

  switch (status) {
    case 'idle':
      return null;
    case 'loading':
      return <Info>Loading tournaments ...</Info>;
    case 'error':
      return (
        <Info>
          <p>Something went wrong</p>
          <Button onClick={getTournaments}>Retry</Button>
        </Info>
      );
    case 'success':
      return (
        <>
          {!tournaments.length ? (
            <Info>No tournaments found.</Info>
          ) : (
            <Grid>
              {tournaments.map((tournament) => (
                <TournamentListItem
                  key={tournament.id}
                  tournament={tournament}
                  handleEdit={onEdit(tournament.id)}
                  handleDelete={onDelete(tournament.id)}
                />
              ))}
            </Grid>
          )}
        </>
      );
  }
};

export default TournamentsList;
