import React from 'react';
import { mount } from 'enzyme';
import Title from '../../../src/components/Title/Title';

describe('<Title />', function ()  {
  beforeEach(function () {
    this.setTitle = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds a title using the Highcharts setTitle method', function () {
      mount(<Title setTitle={this.setTitle}>My Title</Title>);
      expect(this.setTitle).to.have.been.calledWith(
        { text: 'My Title', setTitle: this.setTitle }, null, true
      );
    });

    it('adds should pass additional props through to Highcharts setTitle method', function () {
      mount(<Title align="right" setTitle={this.setTitle}>My Other Title</Title>);
      expect(this.setTitle).to.have.been.calledWith(
        { text: 'My Other Title', align: 'right', setTitle: this.setTitle }, null, true
      );
    });
  });

  describe('update', function () {
    it('should use the setTitle method when the data changes', function () {
      const wrapper = mount(
        <Title setTitle={this.setTitle}>My Title</Title>
      );
      wrapper.setProps({ x: 10, y: 20, children: 'My New Title' });
      expect(this.setTitle).to.have.been.calledWith({ x: 10, y: 20, text: 'My New Title' }, null, true);
    });
  });

  describe('when unmounted', function () {
    it('removes the title by setting the title to text', function () {
      const wrapper = mount(<Title setTitle={this.setTitle}>My Title</Title>);
      wrapper.unmount();
      expect(this.setTitle).to.have.been.calledWith({ text: null }, null, true);
    });
  });
});
