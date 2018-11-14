import React from 'react';
import { createMockProvidedChart, uuidRegex } from '../../test-utils'
import Annotation from '../../../src/components/Annotation/Annotation';

describe('<Annotation />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart();
    chartStubs.addAnnotation = jest.fn();
    chartStubs.removeAnnotation = jest.fn();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart,
      needsRedraw
    };
  });

  describe('when mounted', () => {
    it('adds an annotation using the chart addAnnotation method', () => {
      mount(<Annotation id="My Annotation" {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAnnotation).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My Annotation' }
      ));
    });

    it('should pass additional props through to chart addAnnotation method', () => {
      mount(<Annotation
        id="My Other Annotation"
        labels={ [{ text: "label", point: { x: 200, y: 200} }] }
        labelOptions={ { borderColor: 'red' }}
        {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAnnotation).toHaveBeenCalledWith(expect.objectContaining({
        id: 'My Other Annotation',
        labelOptions: { borderColor: 'red' },
        labels: [{ text: "label", point: { x: 200, y: 200} }]
      }));
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <Annotation id="myPlotLineIdStr" value={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAnnotation.mock.calls[0][0].id).toBe('myPlotLineIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotLineIdFromFunc'
      mount(
        <Annotation id={idFunc} value={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAnnotation.mock.calls[0][0].id).toBe('myPlotLineIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <Annotation {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAnnotation.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the annotation by id (if the parent chart still exists)', () => {
      const wrapper = mount(
        <Annotation id="My Annotation" {...testContext.propsFromProviders} />
      );
      testContext.chartStubs.removeAnnotation.mockReset();
      wrapper.unmount();
      expect(testContext.chartStubs.removeAnnotation).toHaveBeenCalledWith('My Annotation');
    });
  });

  describe('when updated', () => {
    it('removes and re-adds annotation with new props', () => {
      const wrapper = mount(
        <Annotation id="My Annotation" labels={[{ text: "label", point: { x: 200, y: 200} }]} {...testContext.propsFromProviders} />
      );
      testContext.chartStubs.addAnnotation.mockReset();
      wrapper.setProps({ labels: [{ text: "label", point: { x: 100, y: 100} }]});
      expect(testContext.chartStubs.removeAnnotation).toHaveBeenCalledWith('My Annotation');

      expect(testContext.chartStubs.addAnnotation).toHaveBeenCalledWith(expect.objectContaining({
        id: 'My Annotation',
        labels: [{ text: "label", point: { x: 100, y: 100} }]
      }));
    });
  });

  describe('children', () => {
    it('should pass the ID of the plot band to the children', () => {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <Annotation id="myId" {...testContext.propsFromProviders}>
          <ChildComponent />
        </Annotation>
      ).children();
      expect(wrapper.find(ChildComponent)).toHaveProp('id', 'myId');
    });

  });
});
