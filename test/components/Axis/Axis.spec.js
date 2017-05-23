import React from 'react';
import { mount } from 'enzyme';
import Axis from '../../../src/components/Axis';

describe('<Axis />', function ()  {
  beforeEach(function () {
    this.axis = { remove: sinon.spy() };
    this.otherAxis = { remove: sinon.spy() };

    const getStub = sinon.stub();
    getStub.withArgs('myAxis').returns(this.axis);
    getStub.withArgs('myOtherAxis').returns(this.otherAxis);

    this.chart = {
      addAxis: sinon.spy(),
      get: getStub
    };

    this.context = {
      chart: this.chart
    };
  });

  describe('when mounted', function () {
    it('adds an X axis using the addAxis method when mounted', function () {
      mount(<Axis id="myAxis" dimension="x"/>, {context: this.context});
      expect(this.chart.addAxis).to.have.been.calledWith(
        {id: 'myAxis'}, true, true
      );
    });

    it('adds a Y axis using the addAxis method when mounted', function () {
      mount(<Axis id="myAxis" dimension="y"/>, {context: this.context});
      expect(this.chart.addAxis).to.have.been.calledWith(
        {id: 'myAxis'}, false, true
      );
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis when unmounted', function () {
      const wrapper = mount(<Axis id="myAxis" dimension="x"/>, {context: this.context});
      wrapper.unmount();
      expect(this.axis.remove).to.have.been.called;
      expect(this.otherAxis.remove).not.to.have.been.called;
    });
  });
});
