import {
  logModuleErrorMessage,
  logSeriesErrorMessage,
  logZAxisErrorMessage
} from "../../src/utils/warnings";


describe('utils/warnings', () => {
  process.env.NODE_ENV = 'development'
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "group").mockImplementation(() => {});

  beforeEach(() => {
    console.log.mockClear();
    console.warn.mockClear();
    console.group.mockClear();
  });

  describe('logSeriesErrorMessage', () => {
    it('logs message to console.warn', () => {
      logSeriesErrorMessage('heatmap');

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('This series type "heatmap" requires an additional Highcharts module, or is invalid.')
      );
    });
  });

  describe('logModuleErrorMessage', () => {
    it('logs message to console.log', () => {
      logModuleErrorMessage('Annotation', 'annotations');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('This component "Annotation" requires an additional Highcharts module'),
        expect.anything()
      );
    });
  });

  describe('logZAxisErrorMessage', () => {
    it('logs message to console.log', () => {
      logZAxisErrorMessage();

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('This axis type "ZAxis" requires an additional Highcharts module'),
        expect.anything()
      );
    });
  });
});
