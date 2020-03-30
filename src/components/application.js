
/**
 * Module dependencies.
 */

import { Col, Container, Row } from 'react-grid-system';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Worker, spawn } from 'threads';
import { compose, withState } from 'recompose';
import { pick, takeRight } from 'lodash';
import DailiyNewCasesGraphic from 'components/graphics/daily-new-cases-graphic';
import GitHubButton from 'react-github-btn';
import GitHubIcon from '@material-ui/icons/GitHub';
import MainStatsGraphic from 'components/graphics/main-stats-graphic';
import ParametersForm from 'components/parameters-form';
import React, { Component } from 'react';
import RecoveredVsDeadGraphic from 'components/graphics/recovered-vs-dead-graphic';
import ReportedGraphic from 'components/graphics/reported-graphic';
import SimulationControls from 'components/simulation-controls';
import breakpoints from 'styles/breakpoints';
import styled from 'styled-components';

/**
 * Material theme.
 */

const theme = createMuiTheme({
  typography: {
  },
  palette: {
    primary: {
      main: '#686868',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#686868'
    }
  }
});

/**
 * Default simulation parameters.
 */

const defaultSimulationParameters = {
  population: 10000000,
  daysSinceFirstDiagnostic: 0,
  initialReportedInfected: 1000,
  initialReportedRecovered: 1000,
  initialDead: 100,
  averageRecoveringDays: 20,
  averageDyingDays: 7,
  averageDiagnosticDays: 6,
  transmissibility: 3,
  underReportingFactor: 10,
  measuresSeverity: 0,
  initialTransmissionBoost: 5,
  trueDeathRate: 0.5,
  subSamplingFactor: 0.1
};

/**
 * Wrapper component.
 */

const Wrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  font-family: Roboto;
  font-weight: 200;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: #eaeaea;
`;

/**
 * Padder component.
 */

const Padder = styled.div`
  padding: 8px 64px 0px;

  @media (max-width: ${breakpoints.sm}px) {
    padding: 8px 48px 0px;
  }
`;

/**
 * Title component.
 */

const Title = styled.div`
  color: #696868;
  font-size: 56px;
  font-family: 'Crete Round', serif;
  font-weight: 500;
  margin-bottom: 40px;
  text-align: center;
`;

/**
 * CentereCol component.
 */

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

/**
 * GraphiContainer component.
 */

const GraphicContainer = styled.div`
  width: 45vw;
  height: 30vw;
  min-height: 300px;
  margin-bottom: 32px;

  @media (max-width: ${breakpoints.lg}px) {
    width: calc(75vw);
    min-width: 350px;
  }
`;

/**
 * GithubButtonLink component.
 */

const GithubButtonLink = styled.a`
  color: #686868;
  transition: 0.2s ease all;

  &:visited {
    color: #686868;
  }

  &:hover,:active {
    color: #000000;
  }
`;

/**
 * App component.
 */

class App extends Component {

  playFunction = null;

  resetSimulationParameters = () => {
    const { isStopped, parameters, setParameters } = this.props;

    if (isStopped) {
      setParameters(defaultSimulationParameters);
    } else {
      const allowedDefaultParameters = pick(defaultSimulationParameters, [
        'averageRecoveringDays',
        'averageDyingDays',
        'averageDiagnosticDays',
        'transmissibility',
        'underReportingFactor',
        'measuresSeverity',
        'initialTransmissionBoost',
        'trueDeathRate'
      ]);

      console.log('parameters: ', parameters);
      console.log('defaultSimulationParameters: ', defaultSimulationParameters);
      console.log('allowedDefaultParameters: ', allowedDefaultParameters);

      const parametersToSet = {
        ...parameters,
        ...allowedDefaultParameters
      };

      setParameters(parametersToSet);
    }
  }

  handlePause = () => {
    const { setPlaying } = this.props;

    clearInterval(this.playFunction);

    setPlaying(false);
  }

  handleStop = () => {
    const { setPlaying, setStopped, setTimeWindow } = this.props;

    clearInterval(this.playFunction);

    setPlaying(false);
    setStopped(true);
    setTimeWindow([0, 1]);
  }

  handlePlay = async () => {
    const { isStopped, setPlaying, setStopped, simulation } = this.props;

    setPlaying(true);
    setStopped(false);

    if (isStopped) {
      await simulation.initialize();
    }

    this.playFunction = setInterval(async () => {
      const { runningIterate, setParametersChanges, setRunningIterate, setStats, simulation } = this.props;

      if (!runningIterate) {
        setRunningIterate(true);

        await simulation.iterate();
        const simulationState = await simulation.getState();

        setRunningIterate(false);
        setStats(simulationState.stats);
        setParametersChanges(simulationState.parametersChanges);
      }
    }, 25);
  }

  handleResetParameters = () => {
    this.resetSimulationParameters();
  }

  handleSetSimulationParameters = async () => {
    const { parameters, setSimulationParameters, simulation } = this.props;

    setSimulationParameters(parameters);

    await simulation.setParameters(parameters);
  }

  async componentDidMount() {
    const { setSimulation } = this.props;
    const simulation = await spawn(new Worker('../simulation/index.js'));

    setSimulation(simulation);

    await this.handleSetSimulationParameters();
  }

  render() {
    const {
      isPlaying,
      isStopped,
      parameters,
      parametersChanges,
      runningIterate,
      setParameters,
      setTimeWindow,
      simulationParameters,
      stats,
      timeWindow
    } = this.props;

    const windowedStats = takeRight(stats, stats.length - timeWindow[0]);

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <GithubButtonLink
            href={'https://github.com/jmacedoit/covid-19-simulator'}
            style={{ display: 'block', marginLeft: '8px', marginTop: '8px' }}
          >
            <GitHubIcon />
          </GithubButtonLink>

          <Padder>
            <Container fluid>
              <Row>
                <CenteredCol style={{ paddingTop: '8px' }}>
                  <Title>
                    {'Covid-19 Simulator'}
                  </Title>
                </CenteredCol>
              </Row>

              <Row>
                <ParametersForm
                  isStopped={isStopped}
                  parameters={parameters}
                  setParameters={setParameters}
                />

                <SimulationControls
                  pause={this.handlePause}
                  pauseActive={isPlaying}
                  play={this.handlePlay}
                  playActive={!isPlaying && !runningIterate}
                  reset={this.handleResetParameters}
                  setSimulationParameters={this.handleSetSimulationParameters}
                  setSimulationParametersActive={parameters !== simulationParameters}
                  setTimeWindow={setTimeWindow}
                  simulationDays={stats.length ?? 1}
                  stop={this.handleStop}
                  stopActive={!isStopped}
                  timeWindow={[timeWindow[0], stats.length]}
                />
              </Row>

              <Row style={{ paddingTop: '20px' }}>
                <CenteredCol lg={6}>
                  <GraphicContainer>
                    <MainStatsGraphic
                      parametersChanges={parametersChanges}
                      stats={windowedStats}
                    />
                  </GraphicContainer>
                </CenteredCol>

                <CenteredCol lg={6}>
                  <GraphicContainer>
                    <DailiyNewCasesGraphic
                      parametersChanges={parametersChanges}
                      stats={windowedStats}
                    />
                  </GraphicContainer>
                </CenteredCol>

                <CenteredCol lg={6}>
                  <GraphicContainer>
                    <ReportedGraphic
                      parametersChanges={parametersChanges}
                      stats={windowedStats}
                    />
                  </GraphicContainer>
                </CenteredCol>

                <CenteredCol lg={6}>
                  <GraphicContainer>
                    <RecoveredVsDeadGraphic
                      parametersChanges={parametersChanges}
                      stats={windowedStats}
                    />
                  </GraphicContainer>
                </CenteredCol>
              </Row>

              <div style={{ margin: '16px 0px 72px 0px', textAlign: 'center' }}>
                <GitHubButton
                  aria-label={'Star jmacedoit/covid-19-simulator on GitHub'}
                  data-icon={'octicon-star'}
                  data-show-count={'true'}
                  data-size={'large'}
                  href={'https://github.com/jmacedoit/covid-19-simulator'}
                >
                  {'Star'}
                </GitHubButton>
              </div>
            </Container>
          </Padder>
        </Wrapper>
      </ThemeProvider>
    );
  }

}

/**
 * Export App.
 */

export default compose(
  withState('parameters', 'setParameters', defaultSimulationParameters),
  withState('parametersChanges', 'setParametersChanges', []),
  withState('simulation', 'setSimulation', {}),
  withState('initialized', 'setInitialized', false),
  withState('runningIterate', 'setRunningIterate', false),
  withState('simulationParameters', 'setSimulationParameters', {}),
  withState('isPlaying', 'setPlaying', false),
  withState('isStopped', 'setStopped', true),
  withState('stats', 'setStats', []),
  withState('timeWindow', 'setTimeWindow', [0, 1])
)(App);
