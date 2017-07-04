import React from 'react';
import { mount } from 'enzyme';
import Legend from '../../../src/components/Legend/Legend';

describe('<Legend />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('add legend using the Highcharts update method', function () {
      mount(<Legend update={this.update} />);
      expect(this.update).to.have.been.calledWith({
        legend: {
          enabled: true,
          update: this.update
        }
      });
    });

    it('updates the legend with the passed props', function () {
      mount(
        <Legend align="left" y={20} update={this.update} />
      );
      expect(this.update).to.have.been.calledWith({
        legend: {
          enabled: true,
          align: 'left',
          y: 20,
          update: this.update
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Legend update={this.update} />
      );
      wrapper.setProps({ backgroundColor: 'red' });
      expect(this.update).to.have.been.calledWith({
        legend: {
          backgroundColor: 'red'
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Legend', function () {
      const wrapper = mount(<Legend update={this.update} />);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        legend: {
          enabled: false
        }
      })
    });
  });
});
