import Legend from './Legend';
import LegendTitle from './LegendTitle';
import provideChart from '../ChartProvider';
const ChartLegend = Legend;
ChartLegend.Title = provideChart(LegendTitle);
export default ChartLegend;
