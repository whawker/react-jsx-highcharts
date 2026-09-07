import Legend from './Legend.tsx';
import LegendTitle from './LegendTitle.tsx';

const ChartLegend = Legend as typeof Legend & {
  Title: typeof LegendTitle;
};

ChartLegend.Title = LegendTitle;
export default ChartLegend;
