import React, { Component } from 'react';
import provideChart from '../ChartProvider';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideSeries(WrappedComponent) {
  class SeriesProvider extends Component {
    static displayName = `SeriesProvider(${getDisplayName(WrappedComponent)})`;

    render () {
      const id = this.props.id || this.props.seriesId;
      const series = this.props.get(id);
      const update = series && series.update.bind(series);
      const remove = series && series.remove.bind(series);
      const setData = series && series.setData.bind(series);
      const setVisible = series && series.setVisible.bind(series);

      return (
        <WrappedComponent
          {...this.props}
          update={update}
          remove={remove}
          setData={setData}
          setVisible={setVisible} />
      );
    }
  }

  return provideChart(SeriesProvider);
}
