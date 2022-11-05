import styled from 'styled-components';
import theme from '../theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${theme.spacing(6)};
`;

export default Grid;
