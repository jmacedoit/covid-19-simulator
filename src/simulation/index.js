
/**
 * Module dependencies.
 */

import { expose } from 'threads/worker';
import { isEmpty, range } from 'lodash';
import distributions from 'distributions';
import log from 'loglevel';
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

function createFates(people, excludeDiagnosed) {
  const { trueDeathRate, underReportingFactor } = simulationParameters;

  const infected = people.filter(person => person.healthState === healthState.INFECTED);

  infected.forEach(infectedPerson => {
    infectedPerson.willDie = Math.random() <= trueDeathRate * 0.01;

    if (!excludeDiagnosed) {
      infectedPerson.willBeDiagnosed = Math.random() <= 1 / underReportingFactor;
    }
  });
}

/**
 * Calculate stats.
 */

function calculateStats() {
  const diagnosed = studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED);
  const infected = studyPopulation.filter(person => person.healthState === healthState.INFECTED);

  return {
    day: simulationState.day,
    reportedInfected: diagnosed.filter(person => person.healthState === healthState.INFECTED).length,
    reportedRecovered: diagnosed.filter(person => person.healthState === healthState.RECOVERED).length,
    reportedTotalInfected: studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED && person.healthState !== healthState.HEALTHY || person.healthState === healthState.DEAD).length,
    dead: studyPopulation.filter(person => person.healthState === healthState.DEAD).length,
    infected: infected.length,
    newReportedInfected: diagnosed.filter(person => person.diagnosedDay === simulationState.day).length,
    newInfected: infected.filter(person => person.infectedDay === simulationState.day).length,
    recovered: studyPopulation.filter(person => person.healthState === healthState.RECOVERED).length,
    totalInfected: studyPopulation.filter(person => person.healthState !== healthState.HEALTHY).length,
    totalPopulation: studyPopulation.length
  };
}

/**
 * Virtualize real stats.
 */

function virtualizeRawStats(stats) {
  const { daysSinceFirstDiagnostic, subSamplingFactor } = simulationParameters;

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
      day: daysSinceFirstDiagnostic + day,
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
 * Initialize.
 */

function initialize() {
  const {
    averageRecoveringDays,
    initialDead,
    initialReportedInfected,
    initialReportedRecovered,
    population,
    underReportingFactor
  } = simulationParameters;

  studyPopulation = [];
  simulationState = { ...initialSimulationState };

  const daysBackDiagnosticDistribution = distributions.Normal(averageRecoveringDays, averageRecoveringDays / 5);
  const daysList = range(100);
  const daysBackDistributionWeights = daysList.map(day => 1 - daysBackDiagnosticDistribution.cdf(day));

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
    studyPopulation[i].infectedDay = -weighted.select(daysList, daysBackDistributionWeights);
  }

  let lastIndex = upsampleSizeRounded(initialReportedInfected);
  const totalNonDiagnosedInfected = initialReportedInfected * (underReportingFactor - 1);

  for (let i = lastIndex; i < lastIndex + upsampleSizeRounded(totalNonDiagnosedInfected); i++) {
    studyPopulation[i].healthState = healthState.INFECTED;
    studyPopulation[i].infectionState = infectionState.UNDETECTED;
    studyPopulation[i].infectedDay = -weighted.select(daysList, daysBackDistributionWeights);
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

  createFates(studyPopulation.filter(person => person.healthState === healthState.INFECTED && person.infectionState === infectionState.UNDETECTED), true);

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
  const { averageRecoveringDays, initialTransmissionBoost, measuresSeverity, population, transmissibility } = simulationParameters;
  const susceptible = studyPopulation.filter(person => person.healthState === healthState.HEALTHY);
  const infectedFreeCount = studyPopulation.filter(person => person.healthState === healthState.INFECTED && person.infectionState !== infectionState.DIAGNOSED).length;
  const susceptibleCount = susceptible.length;
  const allAffectedCount = studyPopulation.filter(person => person.healthState !== healthState.HEALTHY).length;
  const healthyPopulationRatio = susceptibleCount / upsampleSize(population);
  const initialContagionEffect = allAffectedCount => (initialTransmissionBoost - 1) * Math.exp(-(allAffectedCount * 300 / upsampleSize(population))) + 1;
  const contagionFactor = (1 - measuresSeverity) * transmissibility * initialContagionEffect(allAffectedCount);
  const toBeInfectedCount = infectedFreeCount * healthyPopulationRatio * contagionFactor * (1 / averageRecoveringDays);

  log.debug('Infected before:', studyPopulation.filter(person => person.healthState === healthState.INFECTED).length);

  for (let i = 0; i < Math.round(toBeInfectedCount); i++) {
    susceptible[i].healthState = healthState.INFECTED;
    susceptible[i].infectedDay = simulationState.day;
    susceptible[i].infectionState = infectionState.UNDETECTED;
  }

  createFates(susceptible.slice(0, Math.round(toBeInfectedCount)));

  log.debug('Infected after:', studyPopulation.filter(person => person.healthState === healthState.INFECTED).length);
}

/**
 * Recover.
 */

function recover() {
  const { averageRecoveringDays } = simulationParameters;
  const personCanRecoverThisDay = person => !person.willDie && (person.infectionState === infectionState.DIAGNOSED || !person.willBeDiagnosed) && person.infectedDay !== simulationState.day;
  const infected = studyPopulation.filter(person => person.healthState === healthState.INFECTED && personCanRecoverThisDay(person));
  const recoverDayDistribution = distributions.Normal(averageRecoveringDays, averageRecoveringDays / 5);
  const daysList = range(300);
  const daysDistributionWeights = daysList.map(day => 1000 * recoverDayDistribution.pdf(day));

  log.debug('Recovered before:', studyPopulation.filter(person => person.healthState === healthState.RECOVERED).length);

  infected.forEach(infectedPerson => {
    const daysSinceInfected = simulationState.day - infectedPerson.infectedDay;
    const dayThisPersonWouldRecover = weighted.select(daysList.slice(daysSinceInfected), daysDistributionWeights.slice(daysSinceInfected));

    if (daysSinceInfected === dayThisPersonWouldRecover) {
      infectedPerson.healthState = healthState.RECOVERED;
    }
  });

  log.debug('Recovered after:', studyPopulation.filter(person => person.healthState === healthState.RECOVERED).length);
}

/**
 * Kill.
 */

function kill() {
  const { averageDyingDays } = simulationParameters;
  const personCanDyeThisDay = person => person.willDie && (person.infectionState === infectionState.DIAGNOSED || !person.willBeDiagnosed) && person.infectedDay !== simulationState.day;
  const infectedThatWillDie = studyPopulation.filter(person => person.healthState === healthState.INFECTED && personCanDyeThisDay(person));
  const dyingDayDistribution = distributions.Normal(averageDyingDays, averageDyingDays / 5);
  const daysList = range(300);
  const daysDistributionWeights = daysList.map(day => 1000 * dyingDayDistribution.pdf(day));

  log.debug('Dead before:', studyPopulation.filter(person => person.healthState === healthState.DEAD).length);

  infectedThatWillDie.forEach(infectedPerson => {
    const daysSinceInfected = simulationState.day - infectedPerson.infectedDay;
    const dayThisPersonWouldDie = weighted.select(daysList.slice(daysSinceInfected), daysDistributionWeights.slice(daysSinceInfected));

    if (daysSinceInfected === dayThisPersonWouldDie) {
      infectedPerson.healthState = healthState.DEAD;
    }
  });

  log.debug('Dead after:', studyPopulation.filter(person => person.healthState === healthState.DEAD).length);
}

/**
 * Diagnose.
 */

function diagnose() {
  const { averageDiagnosticDays } = simulationParameters;
  const personCanBeDiagnosedThisDay = person => person.willBeDiagnosed && person.infectionState === infectionState.UNDETECTED && person.infectedDay !== simulationState.day;
  const infectedThatWillBeDiagnosed = studyPopulation.filter(person => person.healthState === healthState.INFECTED && personCanBeDiagnosedThisDay(person));
  const diagnosticDayDistribution = distributions.Normal(averageDiagnosticDays, averageDiagnosticDays / 5);
  const daysList = range(300);
  const daysDistributionWeights = daysList.map(day => 1000 * diagnosticDayDistribution.pdf(day));

  log.debug('Diagnosed before:', studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED).length);

  infectedThatWillBeDiagnosed.forEach(infectedPerson => {
    const daysSinceInfected = simulationState.day - infectedPerson.infectedDay;
    const dayThisPersonWouldBeDiagnosed = weighted.select(daysList.slice(daysSinceInfected), daysDistributionWeights.slice(daysSinceInfected));

    if (daysSinceInfected === dayThisPersonWouldBeDiagnosed) {
      infectedPerson.infectionState = infectionState.DIAGNOSED;
      infectedPerson.diagnosedDay = simulationState.day;
    }
  });

  log.debug('Diagnosed after:', studyPopulation.filter(person => person.infectionState === infectionState.DIAGNOSED).length);
}

/**
 * Simulate a new day.
 */

function iterate() {
  simulationState.day++;

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
