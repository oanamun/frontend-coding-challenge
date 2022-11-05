import { Action } from '../actions/tournaments';
import { TournamentDetails } from '../types/tournament';

export type TournamentState = {
  status: 'idle' | 'loading' | 'error' | 'success';
  tournaments: TournamentDetails[];
};

const initialState: TournamentState = {
  status: 'idle',
  tournaments: [],
};

export default function tournaments(
  state: TournamentState = initialState,
  action: Action
): TournamentState {
  switch (action.type) {
    case 'tournaments/fetch':
      return { ...state, status: 'loading' };
    case 'tournaments/fetch-success':
      return { ...state, status: 'success', tournaments: action.payload };
    case 'tournaments/fetch-error':
      return {
        ...state,
        status: 'error',
        tournaments: [],
      };
    default:
      return state;
  }
}
