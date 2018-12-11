import React, { Component } from 'react';
import { Axis } from 'react-jsx-highcharts';

class GridColumn extends Component {
  static defaultProps = {
    grid: { enabled: true },
    reversed: true
  };

  callback = axis => {
    const parentAxis = this.props.getAxis();

    axis.isColumn = true;
    axis.series = parentAxis.object.series;
  }

  render () {
    const { getAxis, ...rest } = this.props;
    const axis = getAxis();

    return (
      <Axis {...rest} isX={axis.type ===  'xAxis'} callback={this.callback} />
    )
  }
}

export default GridColumn;
