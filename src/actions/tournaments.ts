import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { TournamentDetails } from '../types/tournament';
import { API_URL } from '../constants';
import { RootState } from '../reducers';

// Action Definitions
export interface GetTournamentsRequestAction {
  type: 'tournaments/fetch';
}
export interface GetTournamentsSuccessAction {
  type: 'tournaments/fetch-success';
  payload: TournamentDetails[];
}
export interface GetTournamentsFailureAction {
  type: 'tournaments/fetch-error';
}
export interface EditTournamentsNameAction {
  type: 'tournaments/edit-name';
  payload: { id: string; newName: string };
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
  | EditTournamentsNameAction
  | ShowErrorMessageAction
  | ClearErrorMessageAction;

// Action Creators
export const fetchTournamentsRequest = (): GetTournamentsRequestAction => {
  return {
    type: 'tournaments/fetch',
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
): EditTournamentsNameAction => {
  return {
    type: 'tournaments/edit-name',
    payload: { id, newName },
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
  (): ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(fetchTournamentsRequest());

      const response = await axios.get(`${API_URL}/tournaments`);
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
