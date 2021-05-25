/* eslint-disable no-console */
const titleCSS = 'color:red; font-size:20px; font-weight: bold;';
const descCSS = color => `font-size: 16px; color:${color};`;
const descDefaultCSS = descCSS('#000');
const descDefaultItalicCSS = descCSS('#000') + 'font-style:italic;';
const descKeywordCSS = descCSS('#008') + 'font-weight:600;';
const descStringCSS = descCSS('#080');
const descCommentCSS = descCSS('#808080') + 'font-style:italic;';
const descNewLine = 'font-size: 1px; margin-right: 100%;';

const moduleToImportPath = {
  annotations: 'modules/annotations',
  more: 'highcharts-more',
  threeD: 'highcharts-3d',
  bullet: 'modules/bullet',
  cylinder: 'modules/cylinder',
  dependencyWheel: 'modules/dependency-wheel',
  funnel: 'modules/funnel',
  funnel3d: 'modules/funnel3d',
  histogram: 'modules/histogram-bellcurve',
  item: 'modules/item-series',
  networkgraph: 'modules/networkgraph',
  organization: 'modules/organization',
  pareto: 'modules/pareto',
  pyramid3d: 'modules/pyramid3d',
  sankey: 'modules/sankey',
  solidgauge: 'modules/solid-gauge',
  streamgraph: 'modules/streamgraph',
  sunburst: 'modules/sunburst',
  tilemap: 'modules/tilemap',
  timeline: 'modules/timeline',
  treemap: 'modules/treemap',
  variablepie: 'modules/variable-pie',
  variwide: 'modules/variwide',
  vector: 'modules/vector',
  venn: 'modules/venn',
  windbarb: 'modules/windbarb',
  xrange: 'modules/xrange'
};

const moduleToVarName = {
  annotations: 'addAnnotations',
  more: 'addHighchartsMore',
  threeD: 'addHighcharts3DModule',
  bullet: 'addBulletModule',
  cylinder: 'addCylinderModule',
  dependencyWheel: 'addDependencyWheelModule',
  funnel: 'addFunnelModule',
  funnel3d: 'addFunnel3dModule',
  histogram: 'addHistogramBellCurveModule',
  item: 'addItemModule',
  networkgraph: 'addNetworkGraphModule',
  organization: 'addOrganizationModule',
  pareto: 'addParetoModule',
  pyramid3d: 'addPyramid3dModule',
  sankey: 'addSankeyModule',
  solidgauge: 'addSolidGaugeModule',
  streamgraph: 'addStreamGraphModule',
  sunburst: 'addSunburstModule',
  tilemap: 'addTilemapModule',
  timeline: 'addTimelineModule',
  treemap: 'addTreemapModule',
  variablepie: 'addVariablePieModule',
  variwide: 'addVariwideModule',
  vector: 'addVectorModule',
  venn: 'addVennModule',
  windbarb: 'addWindBarbModule',
  xrange: 'addXRangeModule'
};

const moduleToFeatureMap = {
  annotations: ['annotations'],
  more: [
    'arearange',
    'areasplinerange',
    'boxplot',
    'bubble',
    'columnrange',
    'columnpyramid',
    'errorbar',
    'gauge',
    'packedbubble',
    'polygon',
    'waterfall'
  ],
  threeD: ['scatter3d', 'cylinder', 'funnel3d', 'pyramid3d'],
  bullet: ['bullet'],
  funnel: ['funnel', 'pyramid'],
  histogram: ['histogram', 'bellcurve'],
  item: ['item'],
  networkgraph: ['networkgraph'],
  pareto: ['pareto'],
  sankey: ['sankey', 'organization', 'dependencywheel'],
  solidgauge: ['solidgauge'],
  streamgraph: ['streamgraph'],
  sunburst: ['sunburst'],
  tilemap: ['tilemap'],
  timeline: ['timeline'],
  treemap: ['treemap'],
  variablepie: ['variablepie'],
  variwide: ['variwide'],
  vector: ['vector'],
  venn: ['venn'],
  windbarb: ['windbarb'],
  xrange: ['xrange'],
  // Not alphabetically for module ordering reasons
  dependencyWheel: ['dependencywheel'],
  cylinder: ['cylinder', 'funnel3d', 'pyramid3d'],
  funnel3d: ['funnel3d', 'pyramid3d'],
  organization: ['organization'],
  pyramid3d: ['pyramid3d']
};

const findModules = feature => {
  const modules = Object.keys(moduleToFeatureMap).filter(key => {
    return moduleToFeatureMap[key].indexOf(feature) > -1;
  });

  if (modules.length === 0) return undefined;

  return modules;
};

const generateLines = modules => {
  const importLines = modules.map(
    module =>
      `%c %cimport %c${moduleToVarName[module]} %cfrom %c'highcharts/${moduleToImportPath[module]}'%c;`
  );
  const applyLines = modules.map(
    module => `%c %c${moduleToVarName[module]}%c(Highcharts);`
  );
  const importStyling = modules.map(() => [
    descNewLine,
    descKeywordCSS,
    descDefaultCSS,
    descKeywordCSS,
    descStringCSS,
    descDefaultCSS
  ]);
  const applyStyling = modules.map(() => [
    descNewLine,
    descDefaultItalicCSS,
    descDefaultCSS
  ]);

  return { importLines, applyLines, importStyling, applyStyling };
};

const logDetailedErrorMessage = (warning, modules) => {
  const { importLines, applyLines, importStyling, applyStyling } =
    generateLines(modules);
  const isMultiModule = modules.length > 1;

  console.group('React JSX Highcharts error');
  console.log(`%c${warning}`, titleCSS);
  console.log(
    'More information: https://github.com/whawker/react-jsx-highcharts/wiki/Highcharts-error-%2317'
  );
  console.log.apply(
    console,
    [].concat(
      `You likely need to import the additional module${
        isMultiModule ? 's' : ''
      }, try adding
    %c
    %c %cimport %cHighcharts %cfrom %c'highcharts'%c;
    ${importLines.join('\n')}
    %c
    %c %c// After imports, but before component - apply additional functionality from module${
      isMultiModule ? 's' : ''
    } to Highcharts
    ${applyLines.join('\n')}`.replace(/^ +/gm, ''),
      descNewLine,
      descNewLine,
      descKeywordCSS,
      descDefaultCSS,
      descKeywordCSS,
      descStringCSS,
      descDefaultCSS,
      ...importStyling,
      descNewLine,
      descNewLine,
      descCommentCSS,
      ...applyStyling
    )
  );
  console.groupEnd();
};

export const logSeriesErrorMessage = seriesType => {
  if (process.env.NODE_ENV === 'development') {
    const warning = `This series type "${seriesType}" requires an additional Highcharts module`;
    const modules = findModules(seriesType);

    if (!modules) {
      console.warn(`${warning}, or is invalid.`);
      return;
    }

    logDetailedErrorMessage(warning, modules);
  }
};

export const logModuleErrorMessage = (componentName, moduleName) => {
  if (process.env.NODE_ENV === 'development') {
    const warning = `This component "${componentName}" requires an additional Highcharts module`;
    const modules = findModules(moduleName);

    if (!modules) {
      console.warn(`${warning}, or is invalid.`);
      return;
    }

    logDetailedErrorMessage(warning, modules);
  }
};

export const log3DModuleErrorMessage = () => {
  if (process.env.NODE_ENV === 'development') {
    logDetailedErrorMessage(
      '3D features such as "ZAxis" require an additional Highcharts module',
      ['threeD']
    );
  }
};
