import RangeSelector from './RangeSelector';
import RangeSelectorButton from './RangeSelectorButton';
import RangeSelectorInput from './RangeSelectorInput';
import { provideChart } from 'react-jsx-highcharts';
const ChartRangeSelector = provideChart(RangeSelector);
ChartRangeSelector.Button = provideChart(RangeSelectorButton);
ChartRangeSelector.Input = provideChart(RangeSelectorInput);
export default ChartRangeSelector;
