import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { TournamentDetails } from '../types/tournament';
import { API_URL } from '../constants';
import { RootState } from '../reducers';

// Action Definitions
export interface GetTournamentsRequestAction {
  type: 'tournaments/fetching';
}
export interface GetTournamentsSuccessAction {
  type: 'tournaments/fetch-success';
  payload: TournamentDetails[];
}
export interface GetTournamentsFailureAction {
  type: 'tournaments/fetch-error';
}
export interface EditTournamentNameAction {
  type: 'tournaments/edit-name';
  payload: { id: string; newName: string };
}
export interface DeleteTournamentAction {
  type: 'tournaments/delete';
  payload: { id: string };
}
export interface CreateTournamentAction {
  type: 'tournaments/create';
  payload: { tournament: TournamentDetails };
}
export interface AddTournamentAction {
  type: 'tournaments/add';
  payload: { tournament: TournamentDetails; index: number };
}
export interface ShowErrorMessageAction {
  type: 'tournaments/show-error';
  payload: { message: string };
}
export interface ClearErrorMessageAction {
  type: 'tournaments/clear-error';
}

// Union Action Types
export type Action =
  | GetTournamentsRequestAction
  | GetTournamentsSuccessAction
  | GetTournamentsFailureAction
  | EditTournamentNameAction
  | DeleteTournamentAction
  | CreateTournamentAction
  | AddTournamentAction
  | ShowErrorMessageAction
  | ClearErrorMessageAction;

// Action Creators
export const fetchingTournamentsRequest = (): GetTournamentsRequestAction => {
  return {
    type: 'tournaments/fetching',
  };
};

export const fetchTournamentsSuccess = (
  tournaments: TournamentDetails[]
): GetTournamentsSuccessAction => {
  return {
    type: 'tournaments/fetch-success',
    payload: tournaments,
  };
};

export const fetchTournamentsFailure = (): GetTournamentsFailureAction => {
  return {
    type: 'tournaments/fetch-error',
  };
};

export const editTournamentName = (
  id: string,
  newName: string
): EditTournamentNameAction => {
  return {
    type: 'tournaments/edit-name',
    payload: { id, newName },
  };
};

export const deleteTournament = (id: string): DeleteTournamentAction => {
  return {
    type: 'tournaments/delete',
    payload: { id },
  };
};

export const createTournament = (
  tournament: TournamentDetails
): CreateTournamentAction => {
  return {
    type: 'tournaments/create',
    payload: { tournament },
  };
};

export const addTournament = (
  tournament: TournamentDetails,
  index: number
): AddTournamentAction => {
  return {
    type: 'tournaments/add',
    payload: { tournament, index },
  };
};

export const showErrorMessage = (message: string): ShowErrorMessageAction => {
  return {
    type: 'tournaments/show-error',
    payload: { message },
  };
};

export const clearErrorMessage = (): ClearErrorMessageAction => {
  return {
    type: 'tournaments/clear-error',
  };
};

export const fetchTournaments =
  (searchWord: string): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(fetchingTournamentsRequest());

      const response = await axios.get(
        `${API_URL}/tournaments?q=${searchWord}`
      );
      dispatch(fetchTournamentsSuccess(response.data));
    } catch (error) {
      dispatch(fetchTournamentsFailure());
    }
  };

export const editTournament =
  (
    id: string,
    name: string
  ): ThunkAction<Promise<void>, RootState, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<void> => {
    const editedTournament = getState().tournaments.tournaments.find(
      (tournament) => tournament.id === id
    );
    if (!editedTournament) {
      dispatch(showErrorMessage('Tournament not found.'));
      return;
    }

    const initialName = editedTournament.name;
    dispatch(editTournamentName(id, name));

    try {
      await axios.patch(`${API_URL}/tournaments/${id}`, {
        name,
      });
    } catch (error) {
      dispatch(editTournamentName(id, initialName));
      dispatch(showErrorMessage('Something went wrong. Please try again.'));
    }
  };

export const deleteTournamentCall =
  (id: string): ThunkAction<Promise<void>, RootState, {}, AnyAction> =>
  async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => RootState
  ): Promise<void> => {
    const index = getState().tournaments.tournaments.findIndex(
      (tournament) => tournament.id === id
    );

    if (index < 0) {
      dispatch(showErrorMessage('Tournament not found.'));
      return;
    }

    const deletedTournament = { ...getState().tournaments.tournaments[index] };
    dispatch(deleteTournament(id));

    try {
      await axios.delete(`${API_URL}/tournaments/${id}`);
    } catch (error) {
      dispatch(addTournament(deletedTournament, index));
      dispatch(showErrorMessage('Something went wrong. Please try again.'));
    }
  };

export const createTournamentCall =
  (name: string): ThunkAction<Promise<void>, RootState, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/tournaments`, { name });
      dispatch(createTournament(response.data));
    } catch (error) {
      dispatch(showErrorMessage('Something went wrong. Please try again.'));
    }
  };
