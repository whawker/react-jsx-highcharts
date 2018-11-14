import {
  logSeriesErrorMessage,
  logZAxisErrorMessage
} from "../../src/utils/warnings";


describe('utils/warnings', () => {
  const OLD_ENV = process.env.NODE_ENV;

  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "group").mockImplementation(() => {});

  beforeEach(() => {
    process.env.NODE_ENV = 'development'

    console.log.mockClear();
    console.warn.mockClear();
    console.group.mockClear();
  });

  afterEach(() => {
    process.env.NODE_ENV = OLD_ENV;
  });

  describe('logSeriesErrorMessage', () => {
    it('logs message to console.warn', () => {
      logSeriesErrorMessage('heatmap');

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('This series type "heatmap" requires an additional Highcharts module, or is invalid.')
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
