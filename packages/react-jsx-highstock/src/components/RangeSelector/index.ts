import RangeSelector from './RangeSelector';
import RangeSelectorButton from './RangeSelectorButton';
import RangeSelectorInput from './RangeSelectorInput';

const ChartRangeSelector = RangeSelector as typeof RangeSelector & {
  Button: typeof RangeSelectorButton;
  Input: typeof RangeSelectorInput;
};
ChartRangeSelector.Button = RangeSelectorButton;
ChartRangeSelector.Input = RangeSelectorInput;

export default ChartRangeSelector;
