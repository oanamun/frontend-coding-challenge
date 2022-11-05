import styled from 'styled-components';
import theme from '../theme';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius};
  margin-left: auto;
  margin-right: auto;
  background-color: ${theme.palette.background.base};
  width: 100%;
  padding: ${theme.spacing(4)};
  box-sizing: border-box;
`;

export default Card;
