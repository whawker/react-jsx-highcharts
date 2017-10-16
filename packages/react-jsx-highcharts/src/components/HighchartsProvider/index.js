import React, { Component } from 'react';
import PropTypes from 'prop-types';
import providedProps from '../../utils/providedProps';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideHighcharts(WrappedComponent) {
  class HighchartsProvider extends Component {
    static displayName = `HighchartsProvider(${getDisplayName(WrappedComponent)})`;

    static contextTypes = {
      Highcharts: PropTypes.object
    };

    constructor (props, context) {
      super(props, context);

      providedProps(
        'HighchartsProvider',
        ['getHighcharts']
      );
    }

    render () {
      const { Highcharts } = this.context;
      const getHighcharts = () => Highcharts;

      return (
        <WrappedComponent
          {...this.props}
          getHighcharts={getHighcharts} />
      );
    }
  }

  return HighchartsProvider;
}
