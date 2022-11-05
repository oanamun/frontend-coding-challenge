import React from 'react';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import TournamentsList from './tournaments-list';

export const Tournaments = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <TournamentsList />
    </Container>
  );
};

export default Tournaments;
