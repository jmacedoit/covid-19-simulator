
/**
 * Module dependencies.
 */

import { AutoField, AutoForm } from 'uniforms-material';
import { Col, Row } from 'react-grid-system';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { withState } from 'recompose';
import Ajv from 'ajv';
import React, { Component } from 'react';
import Slider from 'components/forms/slider';

/**
 * Parameters schema.
 */

const schema = {
  type: 'object',
  properties: {
    population: {
      description: 'The total number of individuals.',
      type: 'integer',
      minimum: 0,
      maximum: 100000000,
      component: Slider
    },
    daysSinceFirstDiagnostic: {
      description: 'Number of days since the epidemic started. This does not change the simulation results, it just modifies the days displayed on the x axis on the charts.',
      type: 'integer',
      minimum: 0,
      maximum: 300,
      component: Slider
    },
    initialReportedInfected: {
      description: 'Number of reported infected individuals when the simulation starts. The true number of individuals which will be assigned the infected state in the beginning of the simulation is this number multiplied by the under reporting factor.',
      type: 'integer',
      minimum: 0,
      maximum: 100000,
      component: Slider
    },
    initialReportedRecovered: {
      description: 'Number of reported recovered individuals when the simulation starts. The true number of individuals which will be assigned the recovered state in the beginning of the simulation is this number multiplied by the under reporting factor.',
      type: 'integer',
      minimum: 0,
      maximum: 100000,
      component: Slider
    },
    initialDead: {
      description: 'Number of individuals assigned the dead state at the start of the simulation. It is assumed that all dead are reported, so this number corresponds to both the true and reported dead cases. ',
      type: 'integer',
      minimum: 0,
      maximum: 100000,
      component: Slider
    },
    transmissibility: {
      description: 'The transmissibility rate, reproduction number or R0 of the virus. Represents how many people each infected person will infect, on average, if no contention measures are applied.',
      type: 'integer',
      minimum: 0,
      maximum: 30,
      component: Slider
    },
    underReportingFactor: {
      description: 'The ratio between the number of cases reported and true number of cases.',
      type: 'integer',
      minimum: 1,
      maximum: 100,
      component: Slider
    },
    measuresSeverity: {
      description: 'This parameter can be roughtly interpreted as the percentage of normal interactions that are being limited by the contention measures in place.',
      type: 'number',
      minimum: 0,
      maximum: 1,
      step: 0.005,
      component: Slider
    },
    averageDiagnosticDays: {
      description: 'The average number of days between contagion and diagnosis for individuals that will be diagnosed.',
      type: 'integer',
      minimum: 1,
      maxium: 60,
      component: Slider
    },
    averageRecoveringDays: {
      description: 'The average number of days until recovery for individuals that will recover.',
      type: 'integer',
      minimum: 1,
      maximum: 60,
      component: Slider
    },
    averageDyingDays: {
      description: 'The average number of days until death for individuals that will die.',
      type: 'integer',
      minimum: 1,
      maximum: 60,
      component: Slider
    },
    initialTransmissionBoost: {
      description: 'This parameter constitutes a transmissibility multiplier that gradually loses strength as more individuals get infected. It helps to model a more agressive growth in the beginning as highly susceptible individuals (reasons: interaction with lots of people, weak immunity, above average traveling) are still "available" to be infected. As more people get infected, the number of such individuals that remain "available to infect" decreases causing this multiplier to degrade to 1.',
      type: 'number',
      minimum: 1,
      maximum: 10,
      step: 0.1,
      component: Slider
    },
    trueDeathRate: {
      description: 'The true case fatality rate of the virus, i.e, the percentage of true - not reported - infected that will die.',
      type: 'number',
      minimum: 0,
      maximum: 20,
      step: 0.1,
      component: Slider
    },
    subSamplingFactor: {
      description: 'This parameter speeds up the simulation at the cost of accuracy by evaluating only a sample of the population and extrapolating the results.',
      type: 'number',
      minimum: 0.01,
      maximum: 1,
      step: 0.01,
      component: Slider
    }
  }
};

/**
 * Ajdv initialization.
 */

const ajv = new Ajv({ allErrors: true, useDefaults: true });

/**
 * Json schema validator creator.
 */

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors }; // eslint-disable-line no-throw-literal
    }
  };
}

/**
 * The schema validator.
 */

const schemaValidator = createValidator(schema);

/**
 * Bridge schema and validator.
 */

const bridge = new JSONSchemaBridge(schema, schemaValidator);

/**
 * ParametersForm component.
 */

class ParametersForm extends Component {

  render() {
    const { isStopped, parameters, setParameters } = this.props;

    return (
      <>
        <AutoForm
          model={parameters}
          onChangeModel={model => setParameters(model)}
          schema={bridge}
          style={{ width: '100%' }}
        >
          <Row>
            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField
                disabled={!isStopped}
                name={'population'}
              />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField
                disabled={!isStopped}
                name={'daysSinceFirstDiagnostic'}
              />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField
                disabled={!isStopped}
                name={'initialReportedInfected'}
              />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField
                disabled={!isStopped}
                name={'initialReportedRecovered'}
              />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField
                disabled={!isStopped}
                name={'initialDead'}
              />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'averageDiagnosticDays'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'averageRecoveringDays'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'averageDyingDays'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'transmissibility'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'initialTransmissionBoost'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'underReportingFactor'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'measuresSeverity'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField name={'trueDeathRate'} />
            </Col>

            <Col
              lg={3}
              sm={6}
              xl={2}
            >
              <AutoField
                disabled={!isStopped}
                name={'subSamplingFactor'}
              />
            </Col>
          </Row>
        </AutoForm>
      </>
    );
  }

}

export default withState('model', 'setModel', {})(ParametersForm);
