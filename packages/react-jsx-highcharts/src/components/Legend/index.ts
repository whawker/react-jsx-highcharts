import Legend from './Legend';
import LegendTitle from './LegendTitle';

const ChartLegend = Legend as typeof Legend & {
  Title: typeof LegendTitle;
};
ChartLegend.Title = LegendTitle;
export default ChartLegend;
