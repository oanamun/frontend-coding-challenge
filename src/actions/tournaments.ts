import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

import { TournamentDetails } from '../types/tournament';
import { API_URL } from '../constants';

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

// Union Action Types
export type Action =
  | GetTournamentsRequestAction
  | GetTournamentsSuccessAction
  | GetTournamentsFailureAction;

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

export const fetchTournamentsApiCall =
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
