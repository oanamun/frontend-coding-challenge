import { RootState } from '../reducers';

export const selectTournamentsList = (state: RootState) =>
  state.tournaments.tournaments;

export const selectTournamentsStatus = (state: RootState) =>
  state.tournaments.status;

export const selectTournamentsErrorMessage = (state: RootState) =>
  state.tournaments.errorMessage;
