import findKey from 'lodash/findKey';

const titleCSS = 'color:red; font-size:20px; font-weight: bold;';
const descCSS = color => `font-size: 16px; color:${color};`;
const descDefaultCSS = descCSS('#000');
const descDefaultItalicCSS = descCSS('#000') + 'font-style:italic;';
const descKeywordCSS = descCSS('#008') + 'font-weight:600;';
const descStringCSS = descCSS('#080');
const descCommentCSS = descCSS('#808080') + 'font-style:italic;';
const descNewLine = 'font-size: 1px; margin-right: 100%;';

const moduleToImportPath = {
  more: 'highcharts-more',
  threeD: 'highcharts-3d',
  funnel: 'modules/funnel',
  sankey: 'modules/sankey',
  solidgauge: 'modules/solid-gauge',
  streamgraph: 'modules/streamgraph',
  treemap: 'modules/treemap'
};

const moduleToVarName = {
  more: 'addHighchartsMore',
  threeD: 'addHighcharts3DModule',
  funnel: 'addFunnelModule',
  sankey: 'addSankeyModule',
  solidgauge: 'addSolidGaugeModule',
  streamgraph: 'addStreamGraphModule',
  treemap: 'addTreemapModule'
};

const moduleToSeriesTypes = {
  more: ['arearange', 'areasplinerange', 'boxplot', 'bubble', 'columnrange', 'errorbar', 'polygon', 'waterfall', 'gauge'],
  funnel: ['funnel', 'pyramid'],
  sankey: ['sankey'],
  solidgauge: ['solidgauge'],
  streamgraph: ['streamgraph'],
  treemap: ['treemap']
};

const findModule = seriesType => {
  return findKey(moduleToSeriesTypes, seriesTypes => seriesTypes.indexOf(seriesType) !== -1)
}

const logDetailedErrorMessage = (warning, module) => {
  const importPath = moduleToImportPath[module];
  const varName = moduleToVarName[module];

  console.group("React JSX Highcharts error");
  console.log(`%c${warning}`, titleCSS);
  console.log('More information: https://github.com/whawker/react-jsx-highcharts/wiki/Highcharts-error-%2317');
  console.log(
    `You likely need to import the additional module, try adding 
    %c  
    %c %cimport %cHighcharts %cfrom %c'highcharts'%c;
    %c %cimport %c${varName} %cfrom %c'highcharts/${importPath}'%c;
    %c
    %c %c// After imports, but before component - apply additional functionality from module to Highcharts
    %c %c${varName}%c(Highcharts);`.replace(/^ +/gm, ''),
    descNewLine,
    descNewLine, descKeywordCSS, descDefaultCSS, descKeywordCSS, descStringCSS, descDefaultCSS,
    descNewLine, descKeywordCSS, descDefaultCSS, descKeywordCSS, descStringCSS, descDefaultCSS,
    descNewLine,
    descNewLine, descCommentCSS,
    descNewLine, descDefaultItalicCSS, descDefaultCSS
  );
  console.groupEnd();
}

export const logSeriesErrorMessage = seriesType => {
  if (process.env.NODE_ENV === 'development') {
    const warning = `This series type "${seriesType}" requires an additional Highcharts module`;
    const module = findModule(seriesType);

    if (!module) {
      console.warn(`${warning}, or is invalid.`);
      return
    }

    logDetailedErrorMessage(warning, module);
  }
}

export const logZAxisErrorMessage = () => {
  if (process.env.NODE_ENV === 'development') {
    logDetailedErrorMessage('This axis type "ZAxis" requires an additional Highcharts module', 'threeD');
  }
}
