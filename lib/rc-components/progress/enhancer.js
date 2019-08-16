'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var enhancer = function enhancer(WrappedComponent) {
  return function (_WrappedComponent) {
    (0, _inherits3['default'])(Progress, _WrappedComponent);

    function Progress() {
      (0, _classCallCheck3['default'])(this, Progress);
      return (0, _possibleConstructorReturn3['default'])(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Progress, [{
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (!this.path) {
          return;
        }
        var pathStyle = this.path.style;
        pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';
        var now = Date.now();
        if (this.prevTimeStamp && now - this.prevTimeStamp < 100) {
          pathStyle.transitionDuration = '0s, 0s';
        }
        this.prevTimeStamp = Date.now();
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _get3['default'])(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), 'render', this).call(this);
      }
    }]);
    return Progress;
  }(WrappedComponent);
};

exports['default'] = enhancer;
module.exports = exports['default'];