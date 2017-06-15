import React from 'react';
import { mount } from 'enzyme';
import Series from '../../../src/components/Series/Series';

describe('<Series />', function ()  {
  beforeEach(function () {
    this.addSeries = sinon.spy();
    this.update = sinon.spy();
    this.setData = sinon.spy();
    this.setVisible = sinon.spy();
    this.remove = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds an X series using the addSeries method', function () {
      mount(<Series id="mySeries" axisId="myAxis" dimension="x" addSeries={this.addSeries} />);
      expect(this.addSeries).to.have.been.calledWith(
        { id: 'mySeries', xAxis: 'myAxis', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds a Y series using the addSeries method', function () {
      mount(<Series id="mySeries" axisId="myAxis" dimension="y" addSeries={this.addSeries} />);
      expect(this.addSeries).to.have.been.calledWith(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds should pass additional props through to Highcharts addSeries method', function () {
      mount(<Series id="mySeries" axisId="myAxis" dimension="y" data={[5]} step addSeries={this.addSeries} />);
      expect(this.addSeries).to.have.been.calledWith(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true }, true
      );
    });
  });

  describe('update', function () {
    it('should use the setData method on the correct series when the data changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={[]}
          addSeries={this.addSeries}
          update={this.update}
          setData={this.setData}
          setVisible={this.setVisible} />
      );
      wrapper.setProps({ data: [1, 2, 3] });
      expect(this.setData).to.have.been.calledWith([1, 2, 3]);
      expect(this.update).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should use the setVisible method on the correct series when the visibility changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" visible
          addSeries={this.addSeries}
          update={this.update}
          setData={this.setData}
          setVisible={this.setVisible} />
      );
      wrapper.setProps({ visible: false });
      expect(this.setVisible).to.have.been.calledWith(false);
      expect(this.update).not.to.have.been.called;
      expect(this.setData).not.to.have.been.called;
    });

    it('should use the update method on correct series if arbritary props change', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" visible
          addSeries={this.addSeries}
          update={this.update}
          setData={this.setData}
          setVisible={this.setVisible} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(this.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
      expect(this.setData).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should use the most performant method available even when multiple props change', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={[]} visible={false}
          addSeries={this.addSeries}
          update={this.update}
          setData={this.setData}
          setVisible={this.setVisible} />
      );
      wrapper.setProps({ opposite: true, data: [4, 5, 6], visible: true });
      expect(this.setData).to.have.been.calledWith([4, 5, 6]);
      expect(this.setVisible).to.have.been.calledWith(true);
      expect(this.update).to.have.been.calledWith({
        opposite: true
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the correct series', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="y" addSeries={this.addSeries} remove={this.remove} />);
      wrapper.unmount();
      expect(this.remove).to.have.been.called;
    });
  });
});
