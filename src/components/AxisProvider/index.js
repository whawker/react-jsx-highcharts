import React, { Component } from 'react';
import provideChart from '../ChartProvider';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideAxis(WrappedComponent) {
  class AxisProvider extends Component {
    static displayName = `AxisProvider(${getDisplayName(WrappedComponent)})`;

    render () {
      const id = this.props.id || this.props.axisId;
      const axis = this.props.get(id);
      const update = axis && axis.update.bind(axis);
      const remove = axis && axis.remove.bind(axis);

      return (
        <WrappedComponent
          {...this.props}
          update={update}
          remove={remove} />
      );
    }
  }

  return provideChart(AxisProvider);
}
