import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotLine from '../../../src/components/PlotLine/PlotLine';

describe('<PlotLine />', () => {
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
    it('adds a title using the Axis addPlotLine method', () => {
      mount(<PlotLine id="My PlotLine" value={2} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.addPlotLine).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My PlotLine', value: 2 }
      ));
    });

    it('should pass additional props through to Axis addPlotLine method', () => {
      mount(<PlotLine borderColor="red" id="My Other PlotLine" value={24.2} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.addPlotLine).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My Other PlotLine', borderColor: 'red', value: 24.2 }
      ));
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <PlotLine id="myPlotLineIdStr" value={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotLine.mock.calls[0][0].id).toBe('myPlotLineIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotLineIdFromFunc'
      mount(
        <PlotLine id={idFunc} value={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotLine.mock.calls[0][0].id).toBe('myPlotLineIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <PlotLine value={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotLine.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the plot line by id (if the parent axis still exists)', () => {
      const wrapper = mount(
        <PlotLine id="My PlotLine" value={2} {...testContext.propsFromProviders} />
      );
      testContext.axisStubs.removePlotLine.mockReset();
      wrapper.unmount();
      expect(testContext.axisStubs.removePlotLine).toHaveBeenCalledWith('My PlotLine');
    });
  });

  describe('children', () => {
    it('should pass the ID of the plot band to the children', () => {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <PlotLine id="myId" value={20} {...testContext.propsFromProviders}>
          <ChildComponent />
        </PlotLine>
      ).children();
      expect(wrapper.find(ChildComponent)).toHaveProp('id', 'myId');
    });
  });
});
