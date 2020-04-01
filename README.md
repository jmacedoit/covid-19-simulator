# Covid-19 Simulator

Covid-19 Simulator allows anyone to simulate how the numbers of covid-19 can evolve by allowing to interactively play with different parameters and observe their effects.

## Controlable Parameters:

- **Population**: The total number of individuals.

- **Days since first diagnostic**: Number of days since the epidemic started. This does not change the simulation results, it just modifies the days displayed on the x axis on the charts.

- **Initial reported infected**: Number of reported infected individuals when the simulation starts. The true number of individuals which will be assigned the infected state in the beginning of the simulation is this number multiplied by the under reporting factor.

- **Initial reported recovered**: Number of reported recovered individuals when the simulation starts. The true number of individuals which will be assigned the recovered state in the beginning of the simulation is this number multiplied by the under reporting factor.

- **Initial dead**: Number of individuals assigned the dead state at the start of the simulation. It is assumed that all dead are reported, so this number corresponds to both the true and reported dead cases.

- **Transmissibility**: The transmissibility rate of the virus. Determines how contagious is the virus on a totally susceptible population where there are no fighting measures in place. 

- **Under reporting factor**: The ratio between the number of cases reported and true number of cases.

- **Measures severity**: This parameter can be roughtly interpreted as the percentage of normal interactions that are being limited by the contention measures in place.

- **Average diagnostic days**: The average number of days between contagion and diagnosis for individuals that will be diagnosed.

- **Average recovering days**: The average number of days until recovery for individuals that will recover.

- **Average dying days**: The average number of days until death for individuals that will die.

- **Initial transmission boost**: This parameter constitutes a transmissibility multiplier that gradually loses strength as more individuals get infected. It helps to model a more agressive growth in the beginning as highly susceptible individuals (reasons: interaction with lots of people, weak immunity, above average traveling) are still "available" to be infected. As more people get infected, the number of such individuals that remain "available to infect" decreases causing this multiplier to degrade to 1.

- **True death rate**: The true case fatality rate of the virus, i.e, the percentage of true - not reported - infected that will die.

- **Sub sampling factor**: This parameter speeds up the simulation at the cost of accuracy by evaluating only a sample of the population and extrapolating the results.
