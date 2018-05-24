import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotLine from '../../../src/components/PlotLine/PlotLine';

describe('<PlotLine />', function ()  {
  beforeEach(function () {
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    this.axisStubs = axisStubs;

    this.propsFromProviders = {
      getAxis
    };
  });

  context('when mounted', function () {
    it('adds a title using the Axis addPlotLine method', function () {
      mount(<PlotLine id="My PlotLine" value={2} {...this.propsFromProviders} />);
      expect(this.axisStubs.addPlotLine).to.have.been.calledWithMatch(
        { id: 'My PlotLine', value: 2 }
      );
    });

    it('should pass additional props through to Axis addPlotLine method', function () {
      mount(<PlotLine borderColor="red" id="My Other PlotLine" value={24.2} {...this.propsFromProviders} />);
      expect(this.axisStubs.addPlotLine).to.have.been.calledWithMatch(
        { id: 'My Other PlotLine', borderColor: 'red', value: 24.2 }
      );
    });

    it('uses the provided ID if id prop is a string', function () {
      mount(
        <PlotLine id="myPlotLineIdStr" value={2} {...this.propsFromProviders} />
      );
      expect(this.axisStubs.addPlotLine.getCall(0).args[0].id).to.equal('myPlotLineIdStr');
    });

    it('resolves the ID if id prop is a function', function () {
      const idFunc = () => 'myPlotLineIdFromFunc'
      mount(
        <PlotLine id={idFunc} value={2} {...this.propsFromProviders} />
      );
      expect(this.axisStubs.addPlotLine.getCall(0).args[0].id).to.equal('myPlotLineIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', function () {
      mount(
        <PlotLine value={2} {...this.propsFromProviders} />
      );
      expect(this.axisStubs.addPlotLine.getCall(0).args[0].id).to.match(uuidRegex);
    });
  });

  context('when unmounted', function () {
    it('removes the plot line by id (if the parent axis still exists)', function () {
      const wrapper = mount(
        <PlotLine id="My PlotLine" value={2} {...this.propsFromProviders} />
      );
      this.axisStubs.removePlotLine.reset();
      wrapper.unmount();
      expect(this.axisStubs.removePlotLine).to.have.been.calledWith('My PlotLine');
    });
  });

  context('children', function () {
    it('should pass the ID of the plot band to the children', function () {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <PlotLine id="myId" value={20} {...this.propsFromProviders}>
          <ChildComponent />
        </PlotLine>
      ).children();
      expect(wrapper.find(ChildComponent).props()).to.eql(
        { id: 'myId' }
      );
    });
  });
});
