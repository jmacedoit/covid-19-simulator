
/**
 * Module dependencies.
 */

import { get } from 'lodash';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';

/**
 * TitleRaw component.
 */

const TitleRaw = styled.h3`
  color: ${({ theme }) => get(theme, 'palette.text.primary')};
  margin: 4px 0px 4px 0px;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
`;

/**
 * Title component.
 */

function Title({ children }) {
  const theme = useTheme();

  return (
    <TitleRaw theme={theme}>
      {children}
    </TitleRaw>
  );
}

/**
 * Export Title component.
 */

export default Title;
