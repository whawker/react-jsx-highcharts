import React from 'react';
import { mount } from 'enzyme';
import LegendTitle from '../../../src/components/Legend/LegendTitle';

describe('<Legend.Title />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('add legend using the Highcharts update method', function () {
      mount(<LegendTitle update={this.update}>My Legend Title</LegendTitle>);
      expect(this.update).to.have.been.calledWith({
        legend: {
          title: {
            text: 'My Legend Title',
            update: this.update
          }
        }
      });
    });

    it('updates the legend with the passed props', function () {
      mount(
        <LegendTitle style={{ color: 'red' }} update={this.update}>My Legend Title</LegendTitle>
      );
      expect(this.update).to.have.been.calledWith({
        legend: {
          title: {
            text: 'My Legend Title',
            style: { color: 'red' },
            update: this.update
          }
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <LegendTitle update={this.update}>My Legend Title</LegendTitle>
      );
      wrapper.setProps({ children: 'My New Legend Title' });
      expect(this.update).to.have.been.calledWith({
        legend: {
          title: {
            text: 'My New Legend Title'
          }
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the LegendTitle', function () {
      const wrapper = mount(<LegendTitle update={this.update}>My Legend Title</LegendTitle>);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        legend: {
          title: {
            text: null
          }
        }
      })
    });
  });
});
