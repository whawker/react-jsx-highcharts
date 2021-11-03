import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHighcharts, useChart } from 'react-jsx-highcharts';

const MapNavigationButton = props => {
  const Highcharts = useHighcharts();
  const chart = useChart();

  useEffect(() => {
    const { type, ...rest } = props;
    const opts = getMapNavigationButtonConfig(rest, Highcharts);
    updateMapNavigationButton(type, opts, chart);

    return () => {
      // TODO removeButton was missing in original class?
      //const { type } = props;
      //attempt(this.removeButton, type, {});
    };
  }, []);

  return null;
};
const getMapNavigationButtonConfig = (props, Highcharts) => {
  const { children: text, onClick: onclick, ...rest } = props;

  return {
    ...(Highcharts.defaultOptions &&
      Highcharts.defaultOptions.mapNavigation.buttonOptions),
    onclick, // Weird Highcharts inconsistency, onclick instead of events: { click }
    ...rest,
    text
  };
};

const updateMapNavigationButton = (type, config, chart) => {
  const enableButtons = Object.keys(config).length > 0;

  chart.update({
    mapNavigation: {
      enableButtons,
      buttons: {
        [type]: config
      }
    }
  });
};

MapNavigationButton.propTypes = {
  type: PropTypes.oneOf(['zoomIn', 'zoomOut']).isRequired
};

export default MapNavigationButton;
