const React = require('react');
const ReactPrism = require('react-prism');
const { PrismCode } = ReactPrism;

const Code = ({ children }) => (
  <div>
    <pre>
      <PrismCode className="language-jsx">{children}</PrismCode>
    </pre>
  </div>
);

module.exports = Code;
