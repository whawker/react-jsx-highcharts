import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotBand from '../../../src/components/PlotBand/PlotBand';

describe('<PlotBand />', function ()  {
  beforeEach(function () {
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    this.axisStubs = axisStubs;

    this.propsFromProviders = {
      getAxis
    };
  });

  context('when mounted', function () {
    it('adds a title using the Axis addPlotBand method', function () {
      mount(<PlotBand id="My PlotBand" from={1} to={2} {...this.propsFromProviders} />);
      expect(this.axisStubs.addPlotBand).to.have.been.calledWithMatch(
        { id: 'My PlotBand', from: 1, to: 2 }
      );
    });

    it('should pass additional props through to Axis addPlotBand method', function () {
      mount(<PlotBand borderColor="red" id="My Other PlotBand" from={8.8} to={24.2} {...this.propsFromProviders} />);
      expect(this.axisStubs.addPlotBand).to.have.been.calledWithMatch(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2 }
      );
    });

    it('uses the provided ID if id prop is a string', function () {
      mount(
        <PlotBand id="myPlotBandIdStr" from={1} to={2} {...this.propsFromProviders} />
      );
      expect(this.axisStubs.addPlotBand.getCall(0).args[0].id).to.equal('myPlotBandIdStr');
    });

    it('resolves the ID if id prop is a function', function () {
      const idFunc = () => 'myPlotBandIdFromFunc'
      mount(
        <PlotBand id={idFunc} from={1} to={2} {...this.propsFromProviders} />
      );
      expect(this.axisStubs.addPlotBand.getCall(0).args[0].id).to.equal('myPlotBandIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', function () {
      mount(
        <PlotBand from={1} to={2} {...this.propsFromProviders} />
      );
      expect(this.axisStubs.addPlotBand.getCall(0).args[0].id).to.match(uuidRegex);
    });
  });

  context('when unmounted', function () {
    it('removes the plot band by id (if the parent axis still exists)', function () {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} {...this.propsFromProviders} />
      );
      this.axisStubs.removePlotBand.reset();
      wrapper.unmount();
      expect(this.axisStubs.removePlotBand).to.have.been.calledWith('My PlotBand');
    });
  });

  context('children', function () {
    it('should pass the ID of the plot band to the children', function () {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <PlotBand id="myId" from={10} to={20} {...this.propsFromProviders}>
          <ChildComponent />
        </PlotBand>
      );
      expect(wrapper.find(ChildComponent).props()).to.eql(
        { id: 'myId' }
      );
    });
  });
});
