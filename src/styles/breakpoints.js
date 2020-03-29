
/**
 * Module dependencies.
 */

import { setConfiguration } from 'react-grid-system';

/**
 * Breakpoints.
 */

const breakpoints = [576, 768, 992, 1200];

/**
 * React grid system configuration.
 */

setConfiguration({
  breakpoints
});

/**
 * Export breakpoints.
 */

export default {
  sm: breakpoints[0],
  md: breakpoints[1],
  lg: breakpoints[2],
  xl: breakpoints[3]
};
