import React, { useState } from 'react';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import Input from '../../components/Input';
import { InputWrapper } from './styles';
import TournamentsList from './tournaments-list';

export const Tournaments = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <InputWrapper>
        <Input
          value={searchWord}
          onChange={handleSearch}
          placeholder="Search tournament ..."
        />
      </InputWrapper>
      <TournamentsList searchWord={searchWord} />
    </Container>
  );
};

export default Tournaments;
