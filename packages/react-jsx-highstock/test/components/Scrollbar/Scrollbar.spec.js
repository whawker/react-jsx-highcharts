import React from 'react';
import Scrollbar from '../../../src/components/Scrollbar/Scrollbar';

describe('<Scrollbar />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('add scrollbar using the Highcharts update method', function () {
      mount(<Scrollbar update={this.update} />);
      expect(this.update).to.have.been.calledWith({
        scrollbar: {
          enabled: true,
          update: this.update
        }
      });
    });

    it('updates the scrollbar with the passed props', function () {
      mount(
        <Scrollbar barBackgroundColor="red" height={20} update={this.update} />
      );
      expect(this.update).to.have.been.calledWith({
        scrollbar: {
          enabled: true,
          barBackgroundColor: 'red',
          height: 20,
          update: this.update
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Scrollbar update={this.update} />
      );
      wrapper.setProps({ height: 12345 });
      expect(this.update).to.have.been.calledWith({
        scrollbar: {
          height: 12345
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Scrollbar', function () {
      const wrapper = mount(<Scrollbar update={this.update} />);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        scrollbar: {
          enabled: false
        }
      })
    });
  });
});
