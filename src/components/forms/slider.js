
/**
 * Module dependencies.
 */

import { Input, Slider, Tooltip, withStyles } from '@material-ui/core';
import { clamp, get } from 'lodash';
import { connectField } from 'uniforms';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';

/**
 * Label.
 */

const Label = styled.label`
  color: ${({ disabled, theme }) => {
    return disabled ? get(theme, 'palette.text.disabled') : get(theme, 'palette.text.primary');
  }};
`;

/**
 * StyledInput.
 */

const StyledInput = withStyles({
  root: {
    marginBottom: '16px',
    transform: 'translateY(-4px)'
  },
  input: {
    width: '70px',
    borderRadius: '4px',
    paddingTop: '7px',
    paddingLeft: '4px',
    background: '#e3e3e3',
    fontSize: '10px'
  }
})(Input);

/**
 * Slider component.
 */

function FormSlider({ disabled, field, label, onChange, value }) {
  const theme = useTheme();
  const minimum = get(field, 'minimum');
  const maximum = get(field, 'maximum');

  return (
    <>
      <Tooltip
        arrow
        placement={'top'}
        title={get(field, 'description')}
      >
        <Label
          disabled={disabled}
          theme={theme}
        >
          {label}
        </Label>
      </Tooltip>

      <Slider
        aria-label={label}
        disabled={disabled}
        max={maximum}
        min={minimum}
        onChange={(event, value) => {
          onChange(clamp(value, minimum, maximum));
        }}
        step={get(field, 'step', 1)}
        value={Number(value)}
      />

      <StyledInput
        disabled={disabled}
        disableUnderline
        inputProps={{
          'aria-label': label,
          step: get(field, 'step', 1)
        }}
        max={maximum}
        min={minimum}
        onChange={event => {
          onChange(clamp(Number(event.target.value), minimum, maximum));
        }}
        type={'number'}
        value={value}
      />
    </>
  );
}

/**
 * Export Slider.
 */

export default connectField(FormSlider,);
