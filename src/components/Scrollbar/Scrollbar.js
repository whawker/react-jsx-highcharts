import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class Scrollbar extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.updateScrollbar = this.updateScrollbar.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateScrollbar({
      ...rest,
      enabled: true
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateScrollbar(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateScrollbar({
      enabled: false
    });
  }

  updateScrollbar (config) {
    this.context.chart.update({
      scrollbar: config
    }, true);
  }

  render () {
    const { children } = this.props;
    if (!children) return null;

    return (
      <Hidden>{children}</Hidden>
    );
  }
}

export default Scrollbar;
