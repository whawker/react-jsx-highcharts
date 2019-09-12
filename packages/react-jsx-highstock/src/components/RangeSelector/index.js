import RangeSelector from './RangeSelector';
import RangeSelectorButton from './RangeSelectorButton';
import RangeSelectorInput from './RangeSelectorInput';
import { provideChart } from 'react-jsx-highcharts';
const ChartRangeSelector = RangeSelector;
ChartRangeSelector.Button = provideChart(RangeSelectorButton);
ChartRangeSelector.Input = RangeSelectorInput;
export default ChartRangeSelector;
