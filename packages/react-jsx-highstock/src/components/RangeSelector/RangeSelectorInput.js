import { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { mapKeys } from 'lodash-es';
import { upperFirst } from 'lodash-es';
import { getModifiedProps, HighchartsChartContext } from 'react-jsx-highcharts';

class RangeSelectorInput extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  static contextType = HighchartsChartContext;

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateRangeSelectorInputs(rest);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateRangeSelectorInputs(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateRangeSelectorInputs, { enabled: false });
  }

  prefixPropsWithInput = config => {
    return mapKeys(config, (value, key) => {
      return key.indexOf('input') === 0 ? key : `input${upperFirst(key)}`;
    });
  }

  updateRangeSelectorInputs = config => {
    const chart = this.context;
    const inputProps = this.prefixPropsWithInput(config);

    chart.update({
      rangeSelector: {
        ...inputProps
      }
    });
  }

  render () {
    return null;
  }
}

export default RangeSelectorInput;
