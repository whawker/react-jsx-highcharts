/* eslint-disable no-console */
import {
  logModuleErrorMessage,
  logSeriesErrorMessage,
  log3DModuleErrorMessage
} from '../../src/utils/warnings';

describe('utils/warnings', () => {
  const OLD_ENV = process.env.NODE_ENV;

  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console.log, 'apply').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'group').mockImplementation(() => {});

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
            "%c %cimport %caddSankeyModule %cfrom %c'highcharts/modules/sankey'%c;\n" +
            '%c\n' +
            '%c %c// After imports, but before component - apply additional functionality from module to Highcharts\n' +
            '%c %caddSankeyModule%c(Highcharts);'
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
            "%c %cimport %caddHighcharts3DModule %cfrom %c'highcharts/highcharts-3d'%c;\n" +
            "%c %cimport %caddCylinderModule %cfrom %c'highcharts/modules/cylinder'%c;\n" +
            "%c %cimport %caddFunnel3dModule %cfrom %c'highcharts/modules/funnel3d'%c;\n" +
            "%c %cimport %caddPyramid3dModule %cfrom %c'highcharts/modules/pyramid3d'%c;\n" +
            '%c\n' +
            '%c %c// After imports, but before component - apply additional functionality from modules to Highcharts\n' +
            '%c %caddHighcharts3DModule%c(Highcharts);\n' +
            '%c %caddCylinderModule%c(Highcharts);\n' +
            '%c %caddFunnel3dModule%c(Highcharts);\n' +
            '%c %caddPyramid3dModule%c(Highcharts);'
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
