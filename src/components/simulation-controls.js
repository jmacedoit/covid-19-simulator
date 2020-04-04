
/**
 * Module dependencies.
 */

import { Button, IconButton, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import React, { Component } from 'react';
import SettingsBackupRestoreRoundedIcon from '@material-ui/icons/SettingsBackupRestoreRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import breakpoints from 'styles/breakpoints';
import styled from 'styled-components';

/**
 * ControlsContainer.
 */

const ControlsContainer = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

/**
 * TextButtonContainer.
 */

const TextButtonContainer = styled.div`
  display: inline-block;
  margin: 0 8px;

  @media (max-width: ${breakpoints.sm}px) {
    margin: 4px;
  }
`;

/**
 * ButtonGroupContainer.
 */

const ButtonGroupContainer = styled.div`
  display: inline;

  @media (max-width: ${breakpoints.sm}px) {
    display: block;
  }
`;

/**
 * StyledSlider.
 */

const StyledSlider = withStyles({
  thumb: {
    width: 8,
    height: 8,
    backgroundColor: 'currentColor',
    marginTop: '-3px'
  }
})(Slider);

/**
 * SimulationControls component.
 */

class SimulationControls extends Component {

  /**
   * Render component.
   */

  render() {
    const {
      handleShare,
      pause,
      pauseActive,
      play,
      playActive,
      reset,
      setSimulationParameters,
      setSimulationParametersActive,
      setTimeWindow,
      simulationDays,
      stop,
      stopActive,
      timeWindow
    } = this.props;

    return (
      <ControlsContainer>
        <div style={{ textAlign: 'center' }}>
          <ButtonGroupContainer>
            <IconButton
              disabled={!stopActive}
              onClick={stop}
            >
              <StopRoundedIcon />
            </IconButton>

            <IconButton
              disabled={!playActive}
              onClick={play}
            >
              <PlayArrowRoundedIcon />
            </IconButton>

            <IconButton
              disabled={!pauseActive}
              onClick={pause}
            >
              <PauseRoundedIcon />
            </IconButton>
          </ButtonGroupContainer>

          <ButtonGroupContainer>
            <TextButtonContainer>
              <Button
                color={'primary'}
                disabled={!setSimulationParametersActive}
                onClick={setSimulationParameters}
                size={'small'}
                startIcon={<AssignmentTurnedInRoundedIcon />}
                variant={'contained'}
              >
                {'Apply'}
              </Button>
            </TextButtonContainer>

            <TextButtonContainer>
              <Button
                color={'primary'}
                onClick={reset}
                size={'small'}
                startIcon={<SettingsBackupRestoreRoundedIcon />}
                variant={'contained'}
              >
                {'Reset to default'}
              </Button>
            </TextButtonContainer>

            <TextButtonContainer>
              <Button
                color={'primary'}
                onClick={handleShare}
                size={'small'}
                startIcon={<ShareRoundedIcon />}
                variant={'outlined'}
              >
                {'Share'}
              </Button>
            </TextButtonContainer>
          </ButtonGroupContainer>

          <StyledSlider
            disabled={!stopActive}
            max={simulationDays}
            min={0}
            onChange={(event, value) => { setTimeWindow(value); }}
            step={1}
            value={timeWindow}
          />
        </div>
      </ControlsContainer>
    );
  }

}

/**
 * Export SimulationControls.
 */

export default SimulationControls;
