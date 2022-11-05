import { Action } from '../actions/tournaments';
import { TournamentDetails } from '../types/tournament';

export type TournamentState = {
  status: 'idle' | 'loading' | 'error' | 'success';
  tournaments: TournamentDetails[];
  errorMessage: string;
};

const initialState: TournamentState = {
  status: 'idle',
  tournaments: [],
  errorMessage: '',
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
    case 'tournaments/edit-name':
      const index = state.tournaments.findIndex(
        (tournament) => tournament.id === action.payload.id
      );
      const newList = [...state.tournaments];
      newList[index].name = action.payload.newName;
      return {
        ...state,
        tournaments: newList,
        errorMessage: '',
      };
    case 'tournaments/show-error':
      return { ...state, errorMessage: action.payload.message };
    case 'tournaments/clear-error':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
}
