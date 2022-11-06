export type TournamentDetails = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
};

export type Status = 'idle' | 'loading' | 'error' | 'success';
