import 'jest-enzyme';

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

//const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
//const { window } = jsdom;
window.Date = global.Date;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });
global.shallow = Enzyme.shallow;
global.mount = Enzyme.mount;
copyProps(window, global);
