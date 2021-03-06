import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedAxis } from '../../test-utils';
import AxisTitle from '../../../src/components/Axis/AxisTitle';
import * as useAxis from '../../../src/components/UseAxis';

describe('<Axis.Title />', () => {
  let testContext;
  let useAxisSpy;

  beforeEach(() => {
    testContext = {};

    const { axisStubs, providedAxis } = createMockProvidedAxis({
      id: 'myAxis',
      type: 'yAxis'
    });
    testContext.axisStubs = axisStubs;
    useAxisSpy = jest
      .spyOn(useAxis, 'default')
      .mockImplementation(() => providedAxis);
  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });

  describe('when mounted', () => {
    it('sets the correct axis title', () => {
      render(<AxisTitle>My Axis Title</AxisTitle>);
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(
        {
          text: 'My Axis Title'
        },
        expect.any(Boolean)
      );
    });

    it('should pass additional props too', () => {
      render(<AxisTitle align="high">My Axis Title</AxisTitle>);
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(
        {
          text: 'My Axis Title',
          align: 'high'
        },
        expect.any(Boolean)
      );
    });
  });

  describe('update', () => {
    it('should setTitle the correct axis title if the component props change', () => {
      const wrapper = render(<AxisTitle>My Axis Title</AxisTitle>);
      testContext.axisStubs.setTitle.mockClear();

      wrapper.rerender(
        <AxisTitle axisId="myAxis" dimension="x">
          New Title
        </AxisTitle>
      );

      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(
        {
          text: 'New Title',
          dimension: 'x'
        },
        expect.any(Boolean)
      );
    });
  });

  describe('when unmounted', () => {
    it('removes the correct axis title (if the axis still exists)', () => {
      const wrapper = render(<AxisTitle>My Axis Title</AxisTitle>);
      wrapper.unmount();
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(
        {
          text: null
        },
        expect.any(Boolean)
      );
    });
  });
});
