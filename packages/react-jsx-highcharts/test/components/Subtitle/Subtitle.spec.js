import React from 'react';
import { mount } from 'enzyme';
import Subtitle from '../../../src/components/Subtitle/Subtitle';

describe('<Subtitle />', function ()  {
  beforeEach(function () {
    this.setTitle = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds a subtitle using the Highcharts setTitle method', function () {
      mount(<Subtitle setTitle={this.setTitle}>My Subtitle</Subtitle>);
      expect(this.setTitle).to.have.been.calledWith(
        null, { text: 'My Subtitle', setTitle: this.setTitle }, true
      );
    });

    it('adds should pass additional props through to Highcharts setTitle method', function () {
      mount(<Subtitle align="right" setTitle={this.setTitle}>My Other Subtitle</Subtitle>);
      expect(this.setTitle).to.have.been.calledWith(
        null, { text: 'My Other Subtitle', align: 'right', setTitle: this.setTitle }, true
      );
    });
  });

  describe('update', function () {
    it('should use the setTitle method when the data changes', function () {
      const wrapper = mount(
        <Subtitle setTitle={this.setTitle}>My Subtitle</Subtitle>
      );
      wrapper.setProps({ x: 10, y: 20, children: 'My New Subtitle' });
      expect(this.setTitle).to.have.been.calledWith(null, { x: 10, y: 20, text: 'My New Subtitle' }, true);
    });
  });

  describe('when unmounted', function () {
    it('removes the subtitle by setting the subtitle to text', function () {
      const wrapper = mount(<Subtitle setTitle={this.setTitle}>My Subtitle</Subtitle>);
      wrapper.unmount();
      expect(this.setTitle).to.have.been.calledWith(null, { text: null }, true);
    });
  });
});
