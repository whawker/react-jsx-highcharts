import React, { Component } from 'react';
import { mount } from 'enzyme';
import provideSeries from '../../../src/components/SeriesProvider';
import { createMockChart, createMockSeries } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);
const SeriesWrappedComponent = provideSeries(WrappedComponent);

describe('<SeriesProvider />', function () {

  beforeEach(function () {
    this.series = createMockSeries();
    this.chart = createMockChart();
    this.chart.get.withArgs('mySeriesId').returns(this.series);

    this.context = {
      chart: this.chart
    };
  });

  describe('provided prop functions', function () {
    beforeEach(function () {
      this.series.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
      this.series.remove.withArgs({ prop: 'Test1234' }).returns('remove method mock');
      this.series.setData.withArgs({ prop: 'Test4567' }).returns('setData method mock');
      this.series.setVisible.withArgs({ prop: 'Test7654' }).returns('setVisible method mock');
    });

    it('should pass the `update` function of the series to the wrapped component', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().update({ prop: 'Test9876' })).to.eql('update method mock');
    });

    it('should pass the `remove` function of the series to the wrapped component', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().remove({ prop: 'Test1234' })).to.eql('remove method mock');
    });

    it('should pass the `setData` function of the series to the wrapped component', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().setData({ prop: 'Test4567' })).to.eql('setData method mock');
    });

    it('should pass the `setVisible` function of the series to the wrapped component', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().setVisible({ prop: 'Test7654' })).to.eql('setVisible method mock');
    });

    it('should pass the `getSeries` helper function to the wrapped component', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().getSeries()).to.eql(this.series);
    });

    it('should pass all other props through to the WrappedComponent', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" prop1="bob" prop264="dave" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().prop1).to.eql('bob');
      expect(wrapper.props().prop264).to.eql('dave');
    });
  });

  describe('properly scoped prop functions', function () {
    beforeEach(function () {
      this.series.update.withArgs({ prop: 'Test9876' }).returnsThis();
      this.series.remove.withArgs({ prop: 'Test1234' }).returnsThis();
      this.series.setData.withArgs({ prop: 'Test4567' }).returnsThis();
      this.series.setVisible.withArgs({ prop: 'Test7654' }).returnsThis();
    });

    it('the scope of the `update` function should be bound to the series', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().update({ prop: 'Test9876' })).to.eql(this.series);
    });

    it('the scope of the `remove` function should be bound to the series', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().remove({ prop: 'Test1234' })).to.eql(this.series);
    });

    it('the scope of the `setData` function should be bound to the series', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().setData({ prop: 'Test4567' })).to.eql(this.series);
    });

    it('the scope of the `setVisible` function should be bound to the series', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="mySeriesId" />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().setVisible({ prop: 'Test7654' })).to.eql(this.series);
    });
  });

  describe('series not found', function () {
    beforeEach(function () {
      this.chart.get.withArgs('notExistsSeries').returns(undefined);
    });

    it('should not render by default', function () {
      const wrapper = mount(<SeriesWrappedComponent seriesId="notExistsSeries" />, {context: this.context});
      expect(wrapper.html()).to.eql(null);
    });

    it('should render if we permit series to not exist', function () {
      const SeriesNotExistsWrappedComponent = provideSeries(WrappedComponent, false);
      const wrapper = mount(<SeriesNotExistsWrappedComponent seriesId="notExistsSeries" />, {context: this.context});
      expect(wrapper.find(WrappedComponent)).to.be.ok;
      expect(wrapper.html()).to.eql('<div></div>');
    });
  });
});
