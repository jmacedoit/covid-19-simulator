
/**
 * Module dependencies.
 */

import { Normalize } from 'styled-normalize';
import App from 'components/application';
import React, { Fragment } from 'react';

/**
 * Root component.
 */

const Root = () => (
  <Fragment>
    <Normalize />

    <App />
  </Fragment>
);

/**
 * Export Root.
 */

export default Root;
