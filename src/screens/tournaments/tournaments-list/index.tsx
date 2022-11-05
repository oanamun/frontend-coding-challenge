import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchTournamentsApiCall } from '../../../actions/tournaments';
import Button from '../../../components/Button';
import Grid from '../../../components/Grid';
import { RootState } from '../../../reducers';
import { TournamentState } from '../../../reducers/tournaments';
import TournamentListItem from '../tournaments-list-item';
import { Info } from './styles';

type AppDispatch = ThunkDispatch<TournamentState, any, AnyAction>;

const TournamentsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tournaments, status } = useSelector<RootState, TournamentState>(
    (state) => state.tournaments
  );

  useEffect(() => {
    getTournaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTournaments = () => {
    dispatch(fetchTournamentsApiCall());
  };

  const onDelete = () => {
    // todo
  };

  const onEdit = () => {
    // todo
  };

  switch (status) {
    case 'idle':
      return null;
    case 'loading':
      return <Info>Loading tournaments ...</Info>;
    case 'error':
      return (
        <Info>
          <p>Something went wrong</p>
          <Button onClick={getTournaments}>Retry</Button>
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
                  handleEdit={onEdit}
                  handleDelete={onDelete}
                />
              ))}
            </Grid>
          )}
        </>
      );
  }
};

export default TournamentsList;
