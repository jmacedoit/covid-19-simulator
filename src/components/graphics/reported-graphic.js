
/**
 * Module dependencies.
 */

import { ResponsiveLine } from '@nivo/line';
import { first, get, last } from 'lodash';
import React, { Component } from 'react';
import Title from 'components/graphics/title';
import graphicsTheme from 'styles/graphics-theme';

/**
 * ReportedGraphic component.
 */

class ReportedGraphic extends Component {

  render() {
    const { parametersChanges, stats } = this.props;
    const graphicData = [{
      data: stats.map(({ day, reportedRecovered }) => ({
        x: day,
        y: reportedRecovered
      })),
      id: 'Recovered'
    }, {
      data: stats.map(({ day, reportedInfected }) => ({
        x: day,
        y: reportedInfected
      })).slice(),
      id: 'Infected'
    }, {
      data: stats.map(({ day, dead }) => ({
        x: day,
        y: dead
      })),
      id: 'Dead'
    }, {
      data: stats.map(({ day, reportedTotalInfected }) => ({
        x: day,
        y: reportedTotalInfected
      })),
      id: 'All'
    }];

    const colors = ['#87ccaa', '#beaed4', '#fdc086', '#9fdbe0'];
    const tickSpacing = Math.ceil(stats.length / 25);
    const tickValues = stats.filter((element, index) => index % tickSpacing === 0).map(({ day }) => day);
    const firstDay = get(first(stats), 'day');
    const lastDay = get(last(stats), 'day');
    const markers = parametersChanges.filter(day => day >= firstDay && day <= lastDay).map(day => ({
      axis: 'x',
      value: day,
      lineStyle: {
        stroke: '#888888',
        strokeDasharray: 3,
        strokeWidth: 1
      }
    }));

    return (
      <>
        <Title>
          {'Reported occurrences'}
        </Title>

        <ResponsiveLine
          animate={false}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            tickValues,
            legend: 'Days since first case',
            legendOffset: 40,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -65,
            legendPosition: 'middle'
          }}
          colorBy={d => d.color}
          colors={colors}
          curve={'monotoneX'}
          data={graphicData}
          enableArea
          enablePoints={false}
          gridXValues={tickValues}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: 'circle'
            }
          ]}
          lineWidth={2}
          margin={{ bottom: 80, left: 80, right: 95, top: 10 }}
          markers={markers}
          theme={graphicsTheme}
          useMesh
        />
      </>
    );
  }

}

/**
 * Export ReportedGraphic.
 */

export default ReportedGraphic;
