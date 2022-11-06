import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  createTournamentCall,
  deleteTournamentCall,
  editTournament,
  fetchTournaments,
  showErrorMessage,
} from '../actions/tournaments';
import { RootState } from '../reducers';
import { validateName } from '../screens/tournaments/tournaments-list/utils';
import { selectTournamentsList } from '../selectors/tournaments';
import { TournamentDetails } from '../types/tournament';

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useTournaments = () => {
  const dispatch: AppDispatch = useDispatch();
  const tournaments = useSelector<RootState, TournamentDetails[]>(
    selectTournamentsList
  );

  const getTournaments = useCallback(
    (word: string) => {
      dispatch(fetchTournaments(word));
    },
    [dispatch]
  );

  const handleEdit = (id: string) => () => {
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

  const handleDelete = (id: string) => () => {
    const confirmation = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (confirmation) {
      dispatch(deleteTournamentCall(id));
    }
  };

  const handleCreate = () => {
    const name = window.prompt('Tournament Name:')?.trim() || '';

    const isValid = name && validateName(name);
    if (!isValid) {
      dispatch(showErrorMessage('The provided name is not valid'));
      return;
    }

    dispatch(createTournamentCall(name));
  };

  return {
    tournaments,
    getTournaments,
    handleEdit,
    handleDelete,
    handleCreate,
  };
};
