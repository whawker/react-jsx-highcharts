import { provideAxis, YAxis } from 'react-jsx-highcharts';
import GridColumn from './GridColumn';
const AxisGridColumn = provideAxis(GridColumn);
AxisGridColumn.Title = YAxis.Title;
export default AxisGridColumn
