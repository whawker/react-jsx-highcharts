import createContext from 'mini-create-react-context';

const ChartContext = createContext();

export const { Consumer, Provider } = ChartContext;
export default ChartContext;
