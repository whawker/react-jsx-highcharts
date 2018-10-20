import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotBand from '../../../src/components/PlotBand/PlotBand';

describe('<PlotBand />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.propsFromProviders = {
      getAxis
    };
  });

  describe('when mounted', () => {
    it('adds a title using the Axis addPlotBand method', () => {
      mount(<PlotBand id="My PlotBand" from={1} to={2} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.addPlotBand).to.have.been.calledWithMatch(
        { id: 'My PlotBand', from: 1, to: 2 }
      );
    });

    it('should pass additional props through to Axis addPlotBand method', () => {
      mount(<PlotBand borderColor="red" id="My Other PlotBand" from={8.8} to={24.2} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.addPlotBand).to.have.been.calledWithMatch(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2 }
      );
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <PlotBand id="myPlotBandIdStr" from={1} to={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotBand.getCall(0).args[0].id).to.equal('myPlotBandIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotBandIdFromFunc'
      mount(
        <PlotBand id={idFunc} from={1} to={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotBand.getCall(0).args[0].id).to.equal('myPlotBandIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <PlotBand from={1} to={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotBand.getCall(0).args[0].id).to.match(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the plot band by id (if the parent axis still exists)', () => {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} {...testContext.propsFromProviders} />
      );
      testContext.axisStubs.removePlotBand.reset();
      wrapper.unmount();
      expect(testContext.axisStubs.removePlotBand).to.have.been.calledWith('My PlotBand');
    });
  });

  describe('children', () => {
    it('should pass the ID of the plot band to the children', () => {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <PlotBand id="myId" from={10} to={20} {...testContext.propsFromProviders}>
          <ChildComponent />
        </PlotBand>
      );
      expect(wrapper.find(ChildComponent).props()).to.eql(
        { id: 'myId' }
      );
    });
  });
});
