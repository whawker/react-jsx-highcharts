import * as React from 'react';
import TestRenderer from 'react-test-renderer';

import XAxis from '../../../src/components/XAxis/XAxis';
import Axis from '../../../src/components/Axis';
import ChartContext from '../../../src/components/ChartContext';
import { createMockProvidedChart } from '../../test-utils';

describe('<XAxis />', () => {
  let testContext;
  let ProvidedAxis;
  beforeEach(() => {
    testContext = {};
    const { chartStubs } = createMockProvidedChart({
      type: 'chart'
    });
    testContext.chartStubs = chartStubs;

    ProvidedAxis = props => (
      <ChartContext.Provider value={chartStubs}>
        <XAxis {...props} />
      </ChartContext.Provider>
    );
  });

  it('renders an <Axis />', () => {
    const wrapper = new TestRenderer.create(<ProvidedAxis />);
    const axis = wrapper.root.findByType(Axis);

    expect(axis).toBeDefined();
  });

  it('renders an <Axis isX />', () => {
    const wrapper = new TestRenderer.create(<ProvidedAxis />);
    const axis = wrapper.root.findByType(Axis);

    expect(axis.props).toHaveProperty('isX', true);
  });

  it('passes other props through to <Axis />', () => {
    const wrapper = new TestRenderer.create(<ProvidedAxis tickLength={1337} />);
    const axis = wrapper.root.findByType(Axis);

    expect(axis.props).toHaveProperty('tickLength', 1337);
  });

  describe('Highcharts chart', () => {
    beforeEach(() => {
      testContext.chartStubs.type = 'chart';
    });

    it('renders the <Axis /> type if provided', () => {
      const wrapper = new TestRenderer.create(
        <ProvidedAxis type="logarithmic" />
      );
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('type', 'logarithmic');
    });

    it('renders the an <Axis type="linear" /> if no type specified', () => {
      const wrapper = new TestRenderer.create(<ProvidedAxis />);
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('type', 'linear');
    });

    it('uses the id prop if provided', () => {
      const wrapper = new TestRenderer.create(<ProvidedAxis id="myXAxisId" />);
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('id', 'myXAxisId');
    });

    it('does not create an id if id prop not provided', () => {
      const wrapper = new TestRenderer.create(<ProvidedAxis />);
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props.id).not.toBeDefined();
    });
  });

  describe('Highstock chart', () => {
    beforeEach(() => {
      testContext.chartStubs.type = 'stockChart';
    });

    it('renders the <Axis /> type if provided', () => {
      const wrapper = new TestRenderer.create(
        <ProvidedAxis type="logarithmic" />
      );
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('type', 'logarithmic');
    });

    it('renders the an <Axis type="datetime" /> if no type specified', () => {
      const wrapper = new TestRenderer.create(<ProvidedAxis />);
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('type', 'datetime');
    });

    it('uses the id `xAxis` even if an id prop is provided', () => {
      const wrapper = new TestRenderer.create(<ProvidedAxis id="myXAxisId" />);
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('id', 'xAxis');
    });

    it('uses the id `xAxis` if id prop not provided', () => {
      const wrapper = new TestRenderer.create(<ProvidedAxis />);
      const axis = wrapper.root.findByType(Axis);

      expect(axis.props).toHaveProperty('id', 'xAxis');
    });
  });
});
