import { PrismCode } from 'react-prism';

export default ({ name, children }) => (
  <div>
    <pre>
      <PrismCode className="language-jsx">{children}</PrismCode>
    </pre>
    <a href={`https://github.com/whawker/react-jsx-highcharts/blob/gh-pages/examples/${name}/App.js`} className="btn btn-link">See full example code</a>
  </div>
);
