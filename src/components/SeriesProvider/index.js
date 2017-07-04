import React, { Component } from 'react';
import provideChart from '../ChartProvider';
import providedProps from '../../utils/providedProps';
import cleanPropsBeforeUpdate from '../../utils/cleanPropsBeforeUpdate';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideSeries(WrappedComponent, expectsSeriesExists = true) {
  class SeriesProvider extends Component {
    static displayName = `SeriesProvider(${getDisplayName(WrappedComponent)})`;

    constructor (props, context) {
      super(props, context);

      providedProps(
        'SeriesProvider',
        ['update', 'remove', 'setData', 'setVisible', 'getSeries']
      );
    }

    render () {
      const id = this.props.seriesId || this.props.id;
      const series = this.props.get(id);
      if (!series && expectsSeriesExists) return null;

      const update = series && series.update.bind(series);
      const remove = series && series.remove.bind(series);
      const setData = series && series.setData.bind(series);
      const setVisible = series && series.setVisible.bind(series);
      const getSeries = () => series;

      return (
        <WrappedComponent
          {...this.props}
          update={cleanPropsBeforeUpdate(update)}
          remove={remove}
          setData={setData}
          setVisible={setVisible}
          getSeries={getSeries} />
      );
    }
  }

  return provideChart(SeriesProvider);
}
