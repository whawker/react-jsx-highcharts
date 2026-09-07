/* eslint-disable no-console */
import {
  logModuleErrorMessage,
  logSeriesErrorMessage,
  log3DModuleErrorMessage
} from '../../src/utils/warnings';

describe('utils/warnings', () => {
  const OLD_ENV = process.env.NODE_ENV;

  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console.log, 'apply').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'group').mockImplementation(() => {});

  beforeEach(() => {
    process.env.NODE_ENV = 'development';

    console.log.mockClear();
    console.log.apply.mockClear();
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
        expect.stringContaining(
          'This series type "heatmap" requires an additional Highcharts module, or is invalid.'
        )
      );
    });

    it('logs message to console.log (single dependency)', () => {
      logSeriesErrorMessage('sankey');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(
          'This series type "sankey" requires an additional Highcharts module'
        ),
        expect.any(String)
      );

      expect(console.log.apply).toHaveBeenLastCalledWith(
        console,
        expect.arrayContaining([
          'You likely need to import the additional module, try adding\n' +
            '%c\n' +
            "%c %cimport %cHighcharts %cfrom %c'highcharts'%c;\n" +
            "%c %cimport %c'highcharts/modules/sankey'%c;"
        ])
      );
    });

    it('logs message to console.log (multiple dependencies)', () => {
      logSeriesErrorMessage('pyramid3d');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(
          'This series type "pyramid3d" requires an additional Highcharts module'
        ),
        expect.anything()
      );

      expect(console.log.apply).toHaveBeenLastCalledWith(
        console,
        expect.arrayContaining([
          'You likely need to import the additional modules, try adding\n' +
            '%c\n' +
            "%c %cimport %cHighcharts %cfrom %c'highcharts'%c;\n" +
            "%c %cimport %c'highcharts/highcharts-3d'%c;\n" +
            "%c %cimport %c'highcharts/modules/cylinder'%c;\n" +
            "%c %cimport %c'highcharts/modules/funnel3d'%c;\n" +
            "%c %cimport %c'highcharts/modules/pyramid3d'%c;"
        ])
      );
    });
  });

  describe('logModuleErrorMessage', () => {
    it('logs message to console.log', () => {
      logModuleErrorMessage('Annotation', 'annotations');

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(
          'This component "Annotation" requires an additional Highcharts module'
        ),
        expect.anything()
      );
    });
  });

  describe('log3DModuleErrorMessage', () => {
    it('logs message to console.log', () => {
      log3DModuleErrorMessage();

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining(
          '3D features such as "ZAxis" require an additional Highcharts module'
        ),
        expect.anything()
      );
    });
  });
});
