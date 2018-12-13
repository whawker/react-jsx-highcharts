import {
  logModuleErrorMessage,
  logSeriesErrorMessage,
  log3DModuleErrorMessage
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

  describe('logModuleErrorMessage', () => {
    it('logs message to console.log', () => {
      logModuleErrorMessage('Annotation', 'annotations');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('This component "Annotation" requires an additional Highcharts module'),
        expect.anything()
      );
    });
  });

  describe('log3DModuleErrorMessage', () => {
    it('logs message to console.log', () => {
      log3DModuleErrorMessage();

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('3D features such as "ZAxis" require an additional Highcharts module'),
        expect.anything()
      );
    });
  });
});
