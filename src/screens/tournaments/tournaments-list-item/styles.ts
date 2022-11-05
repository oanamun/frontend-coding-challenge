import styled from 'styled-components';
import theme from '../../../theme';

export const ButtonGroup = styled.div`
  display: flex;
  margin-top: ${theme.spacing(2)};
  > * {
    &:first-child {
      margin-right: ${theme.spacing(2)};
    }
  }
`;
