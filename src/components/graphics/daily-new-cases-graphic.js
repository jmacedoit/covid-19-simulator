
/**
 * Module dependencies.
 */

import { ResponsiveLine } from '@nivo/line';
import { first, get, last } from 'lodash';
import React, { Component } from 'react';
import Title from 'components/graphics/title';
import graphicsTheme from 'styles/graphics-theme';

/**
 * DailiyNewCasesGraphic component.
 */

class DailiyNewCasesGraphic extends Component {

  render() {
    const { parametersChanges, stats } = this.props;
    const graphicData = [{
      data: stats.map(({ day, newInfected }) => ({
        x: day,
        y: newInfected
      })),
      id: 'Real'
    }, {
      data: stats.map(({ day, newReportedInfected }) => ({
        x: day,
        y: newReportedInfected
      })).slice(),
      id: 'Reported'
    }];

    const colors = ['#e66565', '#beaed4'];
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
          {'New cases'}
        </Title>

        <span>
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
        </span>
      </>
    );
  }

}

/**
 * Export DailiyNewCasesGraphic.
 */

export default DailiyNewCasesGraphic;
