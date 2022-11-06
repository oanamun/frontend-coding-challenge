import { Action } from '../actions/tournaments';
import { Status, TournamentDetails } from '../types/tournament';

export type TournamentState = {
  status: Status;
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
    case 'tournaments/fetching':
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
      const editedIndex = state.tournaments.findIndex(
        (tournament) => tournament.id === action.payload.id
      );
      const newList = [...state.tournaments];
      newList[editedIndex].name = action.payload.newName;
      return {
        ...state,
        tournaments: newList,
        errorMessage: '',
      };
    case 'tournaments/delete':
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (tournament) => tournament.id !== action.payload.id
        ),
      };
    case 'tournaments/create':
      return {
        ...state,
        tournaments: [action.payload.tournament, ...state.tournaments],
      };
    case 'tournaments/add':
      const newTournaments = [...state.tournaments];
      newTournaments.splice(action.payload.index, 0, action.payload.tournament);

      return {
        ...state,
        tournaments: newTournaments,
      };
    case 'tournaments/show-error':
      return { ...state, errorMessage: action.payload.message };
    case 'tournaments/clear-error':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
}
