
/**
 * Module dependencies.
 */

import { expose } from 'threads/worker';
import { isEmpty, range } from 'lodash';
import distributions from 'distributions';
import log from 'loglevel';
import randomNormal from 'random-normal';
import weighted from 'weighted';

/**
 * Population.
 */

let studyPopulation;

/**
 * Simulation parameters.
 */

let simulationParameters;

/**
 * Simulation state variables.
 */

const initialSimulationState = {
  day: 0,
  parametersChanges: []
};

let simulationState;

let simulationStats;

/**
 * Health state constants.
 */

const healthState = {
  DEAD: 'DEAD',
  HEALTHY: 'HEALTHY',
  INFECTED: 'INFECTED',
  RECOVERED: 'RECOVERED'
};

/**
 * Infection state constants.
 */

const infectionState = {
  UNDETECTED: 'UNDETECTED',
  DIAGNOSED: 'DIAGNOSED'
};

/**
 * Optimization data.
 */

const optimizationData = {};

/**
 * Up sample size.
 */

function upsampleSize(poolSize) {
  const { subSamplingFactor } = simulationParameters;

  return poolSize * subSamplingFactor;
}

/**
 * Sample size rounded.
 */

function upsampleSizeRounded(poolSize) {
  return Math.round(upsampleSize(poolSize));
}

/**
 * Create fates.
 */

function createFates(people) {
  const { ratioCasesDiagnosed, trueDeathRate } = simulationParameters;

  const infected = people.filter(person => person.healthState === healthState.INFECTED);

  infected.forEach(infectedPerson => {
    infectedPerson.willDie = Math.random() <= trueDeathRate * 0.01;
    infectedPerson.willBeDiagnosed = Math.random() <= ratioCasesDiagnosed;
  });
}

/**
 * Calculate stats.
 */

function calculateStats() {
  let reportedInfected = 0;
  let reportedRecovered = 0;
  let reportedTotalInfected = 0;
  let dead = 0;
  let infected = 0;
  let newReportedInfected = 0;
  let newInfected = 0;
  let recovered = 0;
  let totalInfected = 0;

  const studyPopulationLength = studyPopulation.length;
  const simulationDay = simulationState.day;
  const { DIAGNOSED } = infectionState;
  const { DEAD, HEALTHY, INFECTED, RECOVERED } = healthState;

  for (let i = 0; i < studyPopulationLength; i++) {
    const person = studyPopulation[i];
    const personInfectionState = person.infectionState;
    const personHealthState = person.healthState;

    if (personInfectionState === DIAGNOSED) {
      if (personHealthState === INFECTED) {
        reportedInfected++;
      }

      if (personHealthState === RECOVERED) {
        reportedRecovered++;
      }
    }

    if (personInfectionState === DIAGNOSED || personHealthState === DEAD) {
      reportedTotalInfected++;
    }

    if (personHealthState === DEAD) {
      dead++;
    }

    if (personHealthState === INFECTED) {
      infected++;
    }

    if (person.diagnosedDay === simulationDay) {
      newReportedInfected++;
    }

    if (person.infectedDay === simulationDay) {
      newInfected++;
    }

    if (personHealthState === RECOVERED) {
      recovered++;
    }

    if (personHealthState !== HEALTHY) {
      totalInfected++;
    }
  }

  const stats = {
    day: simulationState.day,
    reportedInfected,
    reportedRecovered,
    reportedTotalInfected,
    dead,
    infected,
    newReportedInfected,
    newInfected,
    recovered,
    totalInfected,
    totalPopulation: studyPopulation.length
  };

  return stats;
}

/**
 * Virtualize real stats.
 */

function virtualizeRawStats(stats) {
  const { subSamplingFactor } = simulationParameters;

  return stats.map(dayStat => {
    const {
      day,
      dead,
      infected,
      newInfected,
      newReportedInfected,
      recovered,
      reportedInfected,
      reportedRecovered,
      reportedTotalInfected,
      totalInfected,
      totalPopulation
    } = dayStat;

    return {
      day,
      reportedInfected: reportedInfected / subSamplingFactor,
      reportedRecovered: reportedRecovered / subSamplingFactor,
      reportedTotalInfected: reportedTotalInfected / subSamplingFactor,
      newInfected: newInfected / subSamplingFactor,
      newReportedInfected: newReportedInfected / subSamplingFactor,
      dead: dead / subSamplingFactor,
      infected: infected / subSamplingFactor,
      recovered: recovered / subSamplingFactor,
      totalInfected: totalInfected / subSamplingFactor,
      totalPopulation: totalPopulation / subSamplingFactor
    };
  });
}

/**
 * Efficient truncated normal distribution sampling.
 */

function sampleDay(distributionValues, distributionWeights, mean, stdev, truncationValue) { // eslint-disable-line max-params
  if (truncationValue - mean < stdev) {
    let day;

    do {
      day = Math.round(randomNormal({ mean, dev: stdev }));
    } while (day < truncationValue);

    return day;
  }

  let day;

  try {
    day = weighted.select(distributionValues.slice(truncationValue), distributionWeights.slice(truncationValue));
  } catch (error) {
    if (error instanceof RangeError) {
      day = weighted.select(distributionValues.slice(truncationValue), distributionWeights.slice(truncationValue).map(() => 1));
    }
  }

  return day;
}

/**
 * Estimate exponential back.
 */

function estimateExponentialBack(dayBack, currentValue, daysSinceFirstOccurrence) {
  return Math.exp(Math.log(currentValue) / daysSinceFirstOccurrence * -(dayBack - daysSinceFirstOccurrence));
}

/**
 * Initialize.
 */

function initialize() {
  const {
    daysSinceFirstDiagnostic,
    initialDead,
    initialReportedInfected,
    initialReportedRecovered,
    population,
    underReportingFactor
  } = simulationParameters;

  studyPopulation = [];
  simulationState = { ...initialSimulationState, day: daysSinceFirstDiagnostic };

  const daysList = range(daysSinceFirstDiagnostic + 1).slice(1);
  const daysBackDistributionWeights = daysList.map(day => estimateExponentialBack(day, initialReportedInfected, daysSinceFirstDiagnostic));

  for (let i = 0; i < upsampleSizeRounded(population); i++) {
    studyPopulation.push({
      healthState: healthState.HEALTHY,
      infectionState: null
    });
  }

  for (let i = 0; i < upsampleSizeRounded(initialReportedInfected); i++) {
    studyPopulation[i].healthState = healthState.INFECTED;
    studyPopulation[i].infectionState = infectionState.DIAGNOSED;
    studyPopulation[i].willBeDiagnosed = true;
    studyPopulation[i].infectedDay = -weighted.select(daysList, daysBackDistributionWeights) + simulationState.day;
  }

  let lastIndex = upsampleSizeRounded(initialReportedInfected);
  const totalNonDiagnosedInfected = initialReportedInfected * (underReportingFactor - 1);

  for (let i = lastIndex; i < lastIndex + upsampleSizeRounded(totalNonDiagnosedInfected); i++) {
    studyPopulation[i].healthState = healthState.INFECTED;
    studyPopulation[i].infectionState = infectionState.UNDETECTED;
    studyPopulation[i].infectedDay = -weighted.select(daysList, daysBackDistributionWeights) + simulationState.day;
  }

  lastIndex += upsampleSizeRounded(totalNonDiagnosedInfected);

  for (let i = lastIndex; i < lastIndex + upsampleSizeRounded(initialReportedRecovered); i++) {
    studyPopulation[i].healthState = healthState.RECOVERED;
    studyPopulation[i].infectionState = infectionState.DIAGNOSED;
  }

  lastIndex += upsampleSizeRounded(initialReportedRecovered);
  const totalNonDiagnosedRecovered = initialReportedRecovered * (underReportingFactor - 1);

  for (let i = lastIndex; i < lastIndex + upsampleSizeRounded(totalNonDiagnosedRecovered); i++) {
    studyPopulation[i].healthState = healthState.RECOVERED;
    studyPopulation[i].infectionState = null;
  }

  lastIndex += upsampleSizeRounded(totalNonDiagnosedRecovered);

  for (let i = lastIndex; i < lastIndex + upsampleSizeRounded(initialDead); i++) {
    studyPopulation[i].healthState = healthState.DEAD;
    studyPopulation[i].willDie = true;
    studyPopulation[i].infectionState = null;
  }

  lastIndex += upsampleSizeRounded(initialDead);

  createFates(studyPopulation.filter(person => person.healthState === healthState.INFECTED && person.infectionState === infectionState.UNDETECTED));

  simulationStats = [calculateStats()];

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Diagnosed: ', studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED).length);
    log.debug('Will be diagnosed: ', studyPopulation.filter(person => person.willBeDiagnosed).length);
    log.debug('Will be diagnosed infected: ', studyPopulation.filter(person => person.willBeDiagnosed && person.healthState === healthState.INFECTED).length);
    log.debug('Undiagnosed: ', studyPopulation.filter(person => person.healthState === healthState.INFECTED && person.infectionState === infectionState.UNDETECTED).length);
    log.debug('Will die: ', studyPopulation.filter(person => person.willDie).length);
    log.debug('Dead: ', studyPopulation.filter(person => person.healthState === healthState.DEAD).length);
    log.debug('Recovered: ', studyPopulation.filter(person => person.healthState === healthState.RECOVERED).length);
  }
}

/**
 * Infect.
 */

function infect() {
  const { initialTransmissionBoost, measuresSeverity, population, transmissibility } = simulationParameters;
  let susceptibleCount = 0;
  let infectedFreeCount = 0;
  let allAffectedCount = 0;

  for (let i = 0; i < studyPopulation.length; i++) {
    if (studyPopulation[i].healthState === healthState.INFECTED && studyPopulation[i].infectionState !== infectionState.DIAGNOSED) {
      infectedFreeCount++;
    }

    if (studyPopulation[i].healthState !== healthState.HEALTHY) {
      allAffectedCount++;
    } else {
      susceptibleCount++;
    }
  }

  const healthyPopulationRatio = susceptibleCount / upsampleSize(population);
  const initialContagionEffect = allAffectedCount => (initialTransmissionBoost - 1) * Math.exp(-(allAffectedCount * 300 / upsampleSize(population))) + 1;
  const contagionFactor = (1 - measuresSeverity) * transmissibility * initialContagionEffect(allAffectedCount);
  const toBeInfectedCount = infectedFreeCount * healthyPopulationRatio * contagionFactor * 0.05;

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Infected before:', studyPopulation.filter(person => person.healthState === healthState.INFECTED).length);
  }

  const justInfected = [];
  let i = 0; let j = 0;

  while (i < Math.round(toBeInfectedCount) && j < studyPopulation.length) {
    if (studyPopulation[j].healthState === healthState.HEALTHY) {
      studyPopulation[j].healthState = healthState.INFECTED;
      studyPopulation[j].infectedDay = simulationState.day;
      studyPopulation[j].infectionState = infectionState.UNDETECTED;
      justInfected.push(studyPopulation[j]);

      i++;
    }

    j++;
  }

  createFates(justInfected);

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Infected after:', studyPopulation.filter(person => person.healthState === healthState.INFECTED).length);
  }
}

/**
 * Recover.
 */

function recover() {
  const { averageRecoveringDays } = simulationParameters;
  const personCanRecover = person => !person.willDie && (person.infectionState === infectionState.DIAGNOSED || !person.willBeDiagnosed);
  const infected = optimizationData.infectedTilToday.filter(person => personCanRecover(person));
  const recoverDayDistribution = distributions.Normal(averageRecoveringDays, averageRecoveringDays / 5);
  const daysList = range(300);
  const daysDistributionWeights = daysList.map(day => 100000 * recoverDayDistribution.pdf(day));

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Recovered before:', studyPopulation.filter(person => person.healthState === healthState.RECOVERED).length);
  }

  infected.forEach(infectedPerson => {
    const daysSinceInfected = simulationState.day - infectedPerson.infectedDay;
    const dayThisPersonWouldRecover = sampleDay(daysList, daysDistributionWeights, averageRecoveringDays, averageRecoveringDays / 5, daysSinceInfected);

    if (daysSinceInfected === dayThisPersonWouldRecover) {
      infectedPerson.healthState = healthState.RECOVERED;
    }
  });

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Recovered after:', studyPopulation.filter(person => person.healthState === healthState.RECOVERED).length);
  }
}

/**
 * Kill.
 */

function kill() {
  const { averageDyingDays } = simulationParameters;
  const personCanDyeThisDay = person => person.willDie && (person.infectionState === infectionState.DIAGNOSED || !person.willBeDiagnosed);
  const infectedThatWillDie = optimizationData.infectedTilToday.filter(person => personCanDyeThisDay(person));
  const dyingDayDistribution = distributions.Normal(averageDyingDays, averageDyingDays / 5);
  const daysList = range(300);
  const daysDistributionWeights = daysList.map(day => 1000 * dyingDayDistribution.pdf(day));

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Dead before:', studyPopulation.filter(person => person.healthState === healthState.DEAD).length);
  }

  infectedThatWillDie.forEach(infectedPerson => {
    const daysSinceInfected = simulationState.day - infectedPerson.infectedDay;
    const dayThisPersonWouldDie = sampleDay(daysList, daysDistributionWeights, averageDyingDays, averageDyingDays / 5, daysSinceInfected);

    if (daysSinceInfected === dayThisPersonWouldDie) {
      infectedPerson.healthState = healthState.DEAD;
    }
  });

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Dead after:', studyPopulation.filter(person => person.healthState === healthState.DEAD).length);
  }
}

/**
 * Diagnose.
 */

function diagnose() {
  const { averageDiagnosticDays } = simulationParameters;
  const personCanBeDiagnosedThisDay = person => person.willBeDiagnosed && person.infectionState === infectionState.UNDETECTED;
  const infectedThatWillBeDiagnosed = optimizationData.infectedTilToday.filter(person => personCanBeDiagnosedThisDay(person));
  const diagnosticDayDistribution = distributions.Normal(averageDiagnosticDays, averageDiagnosticDays / 5);
  const daysList = range(300);
  const daysDistributionWeights = daysList.map(day => 1000 * diagnosticDayDistribution.pdf(day));

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Diagnosed before:', studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED).length);
  }

  infectedThatWillBeDiagnosed.forEach(infectedPerson => {
    const daysSinceInfected = simulationState.day - infectedPerson.infectedDay;
    const dayThisPersonWouldBeDiagnosed = sampleDay(daysList, daysDistributionWeights, averageDiagnosticDays, averageDiagnosticDays / 5, daysSinceInfected);

    if (daysSinceInfected === dayThisPersonWouldBeDiagnosed) {
      infectedPerson.infectionState = infectionState.DIAGNOSED;
      infectedPerson.diagnosedDay = simulationState.day;
    }
  });

  if (log.getLevel() <= log.levels.DEBUG) {
    log.debug('Diagnosed after:', studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED).length);
  }
}

/**
 * Prepare data.
 */

function prepareData() {
  optimizationData.infectedTilToday = [];

  for (let i = 0; i < studyPopulation.length; i++) {
    if (studyPopulation[i].healthState === healthState.INFECTED) {
      optimizationData.infectedTilToday.push(studyPopulation[i]);
    }
  }
}

/**
 * Simulate a new day.
 */

function iterate() {
  simulationState.day++;

  prepareData();
  infect();
  recover();
  kill();
  diagnose();

  simulationStats.push(calculateStats());
}

/**
 * Set simulation parameters.
 */

function setParameters(parameters) {
  simulationParameters = { ...parameters };

  if (simulationState) {
    simulationState.parametersChanges = [...simulationState.parametersChanges, simulationState.day];
  }

  // Fates should not be changeable, so leave commented.
  // if (!isEmpty(studyPopulation)) {
  //   createFates(studyPopulation);
  // }
}

/**
 * Gather simulation state.
 */

function getState() {
  return {
    isInitialized: !isEmpty(studyPopulation),
    parametersChanges: simulationState.parametersChanges,
    rawStats: simulationStats,
    stats: virtualizeRawStats(simulationStats)
  };
}

/**
 * Expose methods.
 */

expose({
  setParameters,
  getState,
  initialize,
  iterate
});
