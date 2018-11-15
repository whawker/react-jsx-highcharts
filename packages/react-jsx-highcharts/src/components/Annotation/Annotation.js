import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';
import { logModuleErrorMessage } from '../../utils/warnings';

class Annotation extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired // Provided by ChartProvider
  };

  static defaultProps = {
    id: uuid
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
    if (process.env.NODE_ENV === 'development') {
      const { getChart } = props;
      if (getChart().addAnnotation === null) {
        logModuleErrorMessage('<Annotation />', 'annotations');
      }
    }
  }

  componentDidMount () {
    const chart = this.props.getChart();

    // Create Highcharts Annotation
    const opts = this.getAnnotationConfig();
    chart.addAnnotation(opts);
    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    if (getModifiedProps(prevProps, this.props) === false) return;

    const chart = this.props.getChart();
    // Annotations cannot be updated, we have to remove and re-add
    const opts = this.getAnnotationConfig();
    chart.removeAnnotation(opts.id);
    chart.addAnnotation(opts);
  }

  componentWillUnmount () {
    const chart = this.props.getChart();
    attempt(chart.removeAnnotation, this.id);
  }

  getAnnotationConfig = () => {
    const { id, children, ...rest } = this.props;
    if (!this.id) {
      this.id = typeof id === 'function' ? id() : id
    }

    return {
      id: this.id,
      ...rest
    }
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    const annotationChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, { id: this.id });
    });

    return (
      <Hidden>
        {annotationChildren}
      </Hidden>
    );
  }
}

export default Annotation;
