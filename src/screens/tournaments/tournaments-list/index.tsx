import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrorMessage,
  fetchingTournamentsRequest,
} from '../../../actions/tournaments';
import Button from '../../../components/Button';
import Grid from '../../../components/Grid';
import { RootState } from '../../../reducers';
import {
  selectTournamentsErrorMessage,
  selectTournamentsStatus,
} from '../../../selectors/tournaments';
import TournamentListItem from '../tournaments-list-item';
import { Info } from './styles';
import debounce from 'lodash.debounce';
import { AppDispatch, useTournaments } from '../../../hooks/useTournaments';
import { Status } from '../../../types/tournament';

type TournamentsListProps = {
  searchWord: string;
};

const TournamentsList = ({ searchWord }: TournamentsListProps) => {
  const dispatch: AppDispatch = useDispatch();

  const status = useSelector<RootState, Status>(selectTournamentsStatus);
  const errorMessage = useSelector<RootState, string>(
    selectTournamentsErrorMessage
  );

  const { tournaments, getTournaments, handleEdit, handleDelete } =
    useTournaments();

  const debouncedSearchTournaments = useMemo(
    () => debounce(getTournaments, 500),
    [getTournaments]
  );

  useEffect(() => {
    debouncedSearchTournaments(searchWord);
    if (status !== 'loading') {
      dispatch(fetchingTournamentsRequest());
    }
  }, [searchWord, dispatch, debouncedSearchTournaments]);

  useEffect(() => {
    return () => {
      debouncedSearchTournaments.cancel();
    };
  }, [debouncedSearchTournaments]);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
      dispatch(clearErrorMessage());
    }
  }, [dispatch, errorMessage]);

  switch (status) {
    case 'idle':
      return null;
    case 'loading':
      return <Info>Loading tournaments ...</Info>;
    case 'error':
      return (
        <Info>
          <p>Something went wrong</p>
          <Button onClick={() => getTournaments(searchWord)}>Retry</Button>
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
                  handleEdit={handleEdit(tournament.id)}
                  handleDelete={handleDelete(tournament.id)}
                />
              ))}
            </Grid>
          )}
        </>
      );
  }
};

export default TournamentsList;
