import React from 'react';
import { mount } from 'enzyme';
import Credits from '../../../src/components/Credits/Credits';

describe('<Credits />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('add credits using the Highcharts update method', function () {
      mount(<Credits update={this.update}>github.com</Credits>);
      expect(this.update).to.have.been.calledWith({
        credits: {
          enabled: true,
          text: 'github.com',
          update: this.update
        }
      });
    });

    it('updates the credits with the passed props', function () {
      mount(
        <Credits href="https://www.github.com" update={this.update}>github.com</Credits>
      );
      expect(this.update).to.have.been.calledWith({
        credits: {
          enabled: true,
          href: 'https://www.github.com',
          text: 'github.com',
          update: this.update
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Credits href="https://www.github.com" update={this.update}>github.com</Credits>
      );
      wrapper.setProps({ href: 'https://www.github.com/whawker' });
      expect(this.update).to.have.been.calledWith({
        credits: {
          href: 'https://www.github.com/whawker'
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Credits', function () {
      const wrapper = mount(<Credits update={this.update}>github.com</Credits>);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        credits: {
          enabled: false
        }
      })
    });
  });
});
