import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
var enhancer = function enhancer(WrappedComponent) {
  return function (_WrappedComponent) {
    _inherits(Progress, _WrappedComponent);

    function Progress() {
      _classCallCheck(this, Progress);

      return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    _createClass(Progress, [{
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
        return _get(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), 'render', this).call(this);
      }
    }]);

    return Progress;
  }(WrappedComponent);
};

export default enhancer;