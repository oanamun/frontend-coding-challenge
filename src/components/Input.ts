import styled from 'styled-components';
import theme from '../theme';

const Input = styled.input`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(2)};
  border: none;
  color: ${theme.palette.text.primary};

  @media only screen and (max-width: ${theme.breakpoints.s}) {
    max-width: ${theme.spacing(36)};
  }
`;

export default Input;
