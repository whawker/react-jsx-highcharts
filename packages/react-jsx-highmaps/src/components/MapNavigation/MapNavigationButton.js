import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import isEmpty from 'lodash/isEmpty';
import { provideChart } from 'react-jsx-highcharts';

class MapNavigationButton extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['zoomIn', 'zoomOut']).isRequired,
    getChart: PropTypes.func // Provided by ChartProvider
  };

  componentDidMount () {
    const { type, ...rest } = this.props;
    const opts = this.getMapNavigationButtonConfig(rest);
    this.updateMapNavigationButton(type, opts);
  }

  componentWillUnmount () {
    const { type } = this.props;
    attempt(this.removeButton, type, {});
  }

  getMapNavigationButtonConfig = props => {
    const { getHighcharts, children: text, onClick: onclick, ...rest } = props;
    const Highcharts = getHighcharts();

    return {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.mapNavigation.buttonOptions),
      onclick, // Weird Highcharts inconsistency, onclick instead of events: { click }
      ...rest,
      text
    };
  }

  updateMapNavigationButton = (type, config) => {
    const chart = this.props.getChart();
    chart.update({
      mapNavigation: {
        enableButtons: !isEmpty(config),
        buttons: {
          [type]: config
        }
      }
    })
  }

  render () {
    return null;
  }
}

export default provideChart(MapNavigationButton);

// For testing purposes
export const _MapNavigationButton = MapNavigationButton;
