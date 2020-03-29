
/**
 * Module dependencies.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'components/root';
import 'threads/register'; // eslint-disable-line sort-imports-es6/sort-imports-es6

/**
 * Render react into a container.
 */

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
