import RangeSelector from './RangeSelector.tsx';
import RangeSelectorButton from './RangeSelectorButton.tsx';
import RangeSelectorInput from './RangeSelectorInput.tsx';

const ChartRangeSelector = RangeSelector as typeof RangeSelector & {
  Button: typeof RangeSelectorButton;
  Input: typeof RangeSelectorInput;
};
ChartRangeSelector.Button = RangeSelectorButton;
ChartRangeSelector.Input = RangeSelectorInput;

export default ChartRangeSelector;
