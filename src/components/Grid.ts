import styled from 'styled-components';
import theme from '../theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${theme.spacing(6)};

  @media only screen and (max-width: ${theme.breakpoints.m}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (max-width: ${theme.breakpoints.s}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export default Grid;
