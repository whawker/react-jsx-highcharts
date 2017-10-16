import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, Title, Subtitle, XAxis, YAxis, TreemapSeries, Tooltip
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const formatData = data => {
  const colours = Highcharts.getOptions().colors;
  const formattedData = [];
  Object.keys(data).forEach((regionName, rIndex) => {
    const region = {
      id: `id_${rIndex}`,
      name: regionName,
      color: colours[rIndex]
    };
    let regionSum = 0;

    const countries = Object.keys(data[regionName]);
    countries.forEach((countryName, cIndex) => {
      const country = {
        id: `${region.id}_${cIndex}`,
        name: countryName,
        parent: region.id
      };
      formattedData.push(country);

      Object.keys(data[regionName][countryName]).forEach((causeName, index) => {
        const cause = {
          id: `${country.id}_${index}`,
          name: causeName,
          parent: country.id,
          value: Math.round(parseFloat(data[regionName][countryName][causeName]))
        };
        formattedData.push(cause);
        regionSum += cause.value;
      })
    });

    region.value = Math.round(regionSum / countries.length);
    formattedData.push(region);
  });

  return formattedData;
};

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      treeData: null
    };
  }

  componentDidMount () {
    fetch('data.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {
        this.setState({
          treeData: formatData(json)
        })
      });
  }

  render () {
    const treeData = this.state.treeData;
    if (!treeData) return null;

    const levels = [{
      level: 1,
      dataLabels: {
        enabled: true
      },
      borderWidth: 3
    }];
    const tooltipFormatter = function () {
      return `${this.key}: ${this.point.value}`;
    };

    return (
      <div className="app">
        <HighchartsChart>
          <Title>Global Mortality Rate 2012, per 100,000 population</Title>

          <Subtitle>Click points to drill down. Source: WHO.</Subtitle>

          <XAxis />

          <YAxis id="value">
            <TreemapSeries
              data={treeData}
              allowDrillToNode
              layoutAlgorithm="squarified"
              animationLimit={1000}
              dataLabels={{ enabled: false }}
              levelIsConstant={false}
              levels={levels} />
          </YAxis>

          <Tooltip formatter={tooltipFormatter} />
        </HighchartsChart>

        <ExampleCode name="TreemapDrilldown">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
