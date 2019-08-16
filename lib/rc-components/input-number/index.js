'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _isNegativeZero = require('is-negative-zero');

var _isNegativeZero2 = _interopRequireDefault(_isNegativeZero);

var _InputHandler = require('./InputHandler');

var _InputHandler2 = _interopRequireDefault(_InputHandler);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _input = require('../../input');

var _input2 = _interopRequireDefault(_input);

var _EventManager = require('../../_util/EventManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function defaultParser(input) {
  return input.replace(/[^\w\.-]+/g, '');
}

/**
 * When click and hold on a button - the speed of auto changin the value.
 */
var SPEED = 200;

/**
 * When click and hold on a button - the delay before auto changin the value.
 */
var DELAY = 600;

/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var InputNumber = function (_Component) {
  (0, _inherits3['default'])(InputNumber, _Component);

  function InputNumber(props) {
    (0, _classCallCheck3['default'])(this, InputNumber);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).call(this, props));

    _initialiseProps.call(_this);

    var value = void 0;
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }
    value = _this.toNumber(value);

    _this.state = {
      inputValue: _this.toPrecisionAsStep(value),
      value: value,
      focused: props.autoFocus
    };
    return _this;
  }

  (0, _createClass3['default'])(InputNumber, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        var value = this.state.focused ? nextProps.value : this.getValidValue(nextProps.value, nextProps.min, nextProps.max);
        this.setState({
          value: value,
          inputValue: this.inputting ? value : this.toPrecisionAsStep(value)
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      try {
        this.start = this.input.selectionStart;
        this.end = this.input.selectionEnd;
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // pressingUpOrDown is true means that someone just click up or down button
      if (!this.pressingUpOrDown) {
        return;
      }
      if (this.props.focusOnUpDown && this.state.focused) {
        var selectionRange = this.input.setSelectionRange;
        if (selectionRange && typeof selectionRange === 'function' && this.start !== undefined && this.end !== undefined) {
          this.input.setSelectionRange(this.start, this.end);
        } else {
          this.focus();
        }
        this.pressingUpOrDown = false;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stop();
    }
  }, {
    key: 'getCurrentValidValue',
    value: function getCurrentValidValue(value) {
      var val = value;
      if (val === '') {
        val = '';
      } else if (!this.isNotCompleteNumber(val)) {
        val = this.getValidValue(val);
      } else {
        val = this.state.value;
      }
      return this.toNumber(val);
    }
  }, {
    key: 'getRatio',
    value: function getRatio(e) {
      var ratio = 1;
      if (e.metaKey || e.ctrlKey) {
        ratio = 0.1;
      } else if (e.shiftKey) {
        ratio = 10;
      }
      return ratio;
    }
  }, {
    key: 'getValueFromEvent',
    value: function getValueFromEvent(e) {
      // optimize for chinese input expierence
      return e.target.value.trim().replace(/。/g, '.');
    }
  }, {
    key: 'getValidValue',
    value: function getValidValue(value) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.min;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.max;

      var val = parseFloat(value, 10);
      if (isNaN(val)) {
        return value;
      }
      if (val < min) {
        val = min;
      }
      if (val > max) {
        val = max;
      }
      return val;
    }
  }, {
    key: 'setValue',
    value: function setValue(v, callback) {
      // trigger onChange
      var newValue = this.isNotCompleteNumber(parseFloat(v, 10)) ? undefined : parseFloat(v, 10);
      var changed = newValue !== this.state.value || '' + newValue !== '' + this.state.inputValue;
      if (!('value' in this.props)) {
        this.setState({
          value: newValue,
          inputValue: this.toPrecisionAsStep(v)
        }, callback);
      } else {
        // always set input value same as value
        this.setState({
          inputValue: this.toPrecisionAsStep(this.state.value)
        }, callback);
      }
      if (changed) {
        this.props.onChange(newValue);
      }
    }
  }, {
    key: 'getPrecision',
    value: function getPrecision(value) {
      if ('precision' in this.props) {
        return this.props.precision;
      }
      var valueString = value.toString();
      if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
      }
      var precision = 0;
      if (valueString.indexOf('.') >= 0) {
        precision = valueString.length - valueString.indexOf('.') - 1;
      }
      return precision;
    }

    // step={1.0} value={1.51}
    // press +
    // then value should be 2.51, rather than 2.5
    // if this.props.precision is undefined
    // https://github.com/react-component/input-number/issues/39

  }, {
    key: 'getMaxPrecision',
    value: function getMaxPrecision(currentValue) {
      var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if ('precision' in this.props) {
        return this.props.precision;
      }
      var step = this.props.step;

      var ratioPrecision = this.getPrecision(ratio);
      var stepPrecision = this.getPrecision(step);
      var currentValuePrecision = this.getPrecision(currentValue);
      if (!currentValue) {
        return ratioPrecision + stepPrecision;
      }
      return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
    }
  }, {
    key: 'getPrecisionFactor',
    value: function getPrecisionFactor(currentValue) {
      var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var precision = this.getMaxPrecision(currentValue, ratio);
      return Math.pow(10, precision);
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: 'formatWrapper',
    value: function formatWrapper(num) {
      // http://2ality.com/2012/03/signedzero.html
      if ((0, _isNegativeZero2['default'])(num)) {
        return '-0';
      }
      if (this.props.formatter) {
        return this.props.formatter(num);
      }
      return num;
    }
  }, {
    key: 'toPrecisionAsStep',
    value: function toPrecisionAsStep(num) {
      if (this.isNotCompleteNumber(num) || num === '') {
        return num;
      }
      var precision = Math.abs(this.getMaxPrecision(num));
      if (precision === 0) {
        return num.toString();
      }
      if (!isNaN(precision)) {
        return Number(num).toFixed(precision);
      }
      return num.toString();
    }

    // '1.' '1x' 'xx' '' => are not complete numbers

  }, {
    key: 'isNotCompleteNumber',
    value: function isNotCompleteNumber(num) {
      return isNaN(num) || num === '' || num === null || num && num.toString().indexOf('.') === num.toString().length - 1;
    }
  }, {
    key: 'toNumber',
    value: function toNumber(num) {
      if (this.isNotCompleteNumber(num)) {
        return num;
      }
      if ('precision' in this.props) {
        return Number(Number(num).toFixed(this.props.precision));
      }
      return Number(num);
    }

    // '1.0' '1.00'  => may be a inputing number

  }, {
    key: 'toNumberWhenUserInput',
    value: function toNumberWhenUserInput(num) {
      // num.length > 16 => prevent input large number will became Infinity
      if ((/\.\d*0$/.test(num) || num.length > 16) && this.state.focused) {
        return num;
      }
      return this.toNumber(num);
    }
  }, {
    key: 'upStep',
    value: function upStep(val, rat) {
      var _props = this.props,
          step = _props.step,
          min = _props.min;

      var precisionFactor = this.getPrecisionFactor(val, rat);
      var precision = Math.abs(this.getMaxPrecision(val, rat));
      var result = void 0;
      if (typeof val === 'number') {
        result = ((precisionFactor * val + precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      } else {
        result = min === -Infinity ? step : min;
      }
      return this.toNumber(result);
    }
  }, {
    key: 'downStep',
    value: function downStep(val, rat) {
      var _props2 = this.props,
          step = _props2.step,
          min = _props2.min;

      var precisionFactor = this.getPrecisionFactor(val, rat);
      var precision = Math.abs(this.getMaxPrecision(val, rat));
      var result = void 0;
      if (typeof val === 'number') {
        result = ((precisionFactor * val - precisionFactor * step * rat) / precisionFactor).toFixed(precision);
      } else {
        result = min === -Infinity ? -step : min;
      }
      return this.toNumber(result);
    }
  }, {
    key: 'step',
    value: function step(type, e) {
      var _this2 = this;

      var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var recursive = arguments[3];

      this.stop();
      if (e) {
        e.persist();
        e.preventDefault();
      }
      var props = this.props;
      if (props.disabled) {
        return;
      }
      var value = this.getCurrentValidValue(this.state.inputValue) || 0;
      if (this.isNotCompleteNumber(value)) {
        return;
      }
      var val = this[type + 'Step'](value, ratio);
      var outOfRange = val > props.max || val < props.min;
      if (val > props.max) {
        val = props.max;
      } else if (val < props.min) {
        val = props.min;
      }
      this.setValue(val);
      this.setState({
        focused: true
      });
      if (outOfRange) {
        return;
      }
      this.autoStepTimer = setTimeout(function () {
        _this2[type](e, ratio, true);
      }, recursive ? SPEED : DELAY);
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var props = (0, _extends3['default'])({}, this.props);
      var prefixCls = props.prefixCls,
          disabled = props.disabled,
          readOnly = props.readOnly,
          useTouch = props.useTouch;

      var classes = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls, true), (0, _defineProperty3['default'])(_classNames, props.className, !!props.className), _classNames));
      var editable = !props.readOnly && !props.disabled;
      // focus state, show input value
      // unfocus state, show valid value
      var inputDisplayValue = void 0;
      if (this.state.focused) {
        inputDisplayValue = this.state.inputValue;
      } else {
        inputDisplayValue = this.toPrecisionAsStep(this.state.value);
      }

      if (inputDisplayValue === undefined || inputDisplayValue === null) {
        inputDisplayValue = '';
      }
      var inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
      // ref for test
      return _react2['default'].createElement(
        'div',
        {
          className: classes,
          style: props.style,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          onMouseOver: props.onMouseOver,
          onMouseOut: props.onMouseOut
        },
        _react2['default'].createElement(_input2['default'], {
          required: props.required,
          type: props.type,
          placeholder: props.placeholder,
          onClick: props.onClick,
          tabIndex: props.tabIndex,
          autoComplete: 'off',
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: editable ? this.onKeyDown : _noop2['default'],
          onKeyUp: editable ? this.onKeyUp : _noop2['default'],
          autoFocus: props.autoFocus,
          maxLength: props.maxLength,
          readOnly: props.readOnly,
          disabled: props.disabled,
          max: props.max,
          min: props.min,
          step: props.step,
          name: props.name,
          id: props.id,
          onChange: this.onChange,
          ref: this.saveInput,
          value: inputDisplayValueFormat,
          pattern: props.pattern,
          suffix: this.renderSuffix(),
          label: props.label
        })
      );
    }
  }]);
  return InputNumber;
}(_react.Component);

InputNumber.propTypes = {
  value: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  focusOnUpDown: _propTypes2['default'].bool,
  autoFocus: _propTypes2['default'].bool,
  onChange: _propTypes2['default'].func,
  onKeyDown: _propTypes2['default'].func,
  onKeyUp: _propTypes2['default'].func,
  prefixCls: _propTypes2['default'].string,
  tabIndex: _propTypes2['default'].string,
  disabled: _propTypes2['default'].bool,
  onFocus: _propTypes2['default'].func,
  onBlur: _propTypes2['default'].func,
  readOnly: _propTypes2['default'].bool,
  max: _propTypes2['default'].number,
  min: _propTypes2['default'].number,
  step: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  upHandler: _propTypes2['default'].node,
  downHandler: _propTypes2['default'].node,
  useTouch: _propTypes2['default'].bool,
  formatter: _propTypes2['default'].func,
  parser: _propTypes2['default'].func,
  onMouseEnter: _propTypes2['default'].func,
  onMouseLeave: _propTypes2['default'].func,
  onMouseOver: _propTypes2['default'].func,
  onMouseOut: _propTypes2['default'].func,
  precision: _propTypes2['default'].number,
  required: _propTypes2['default'].bool,
  pattern: _propTypes2['default'].string,
  label: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].node])
};
InputNumber.defaultProps = {
  focusOnUpDown: true,
  useTouch: false,
  prefixCls: 'rc-input-number',
  min: -MAX_SAFE_INTEGER,
  step: 1,
  style: {},
  onChange: _noop2['default'],
  onKeyDown: _noop2['default'],
  onFocus: _noop2['default'],
  onBlur: _noop2['default'],
  parser: defaultParser,
  required: false
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onKeyDown = function (e) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (e.keyCode === 38) {
      var ratio = _this3.getRatio(e);
      _this3.up(e, ratio);
      _this3.stop();
    } else if (e.keyCode === 40) {
      var _ratio = _this3.getRatio(e);
      _this3.down(e, _ratio);
      _this3.stop();
    }
    var onKeyDown = _this3.props.onKeyDown;

    if (onKeyDown) {
      onKeyDown.apply(undefined, [e].concat(args));
    }
  };

  this.onKeyUp = function (e) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    _this3.stop();
    var onKeyUp = _this3.props.onKeyUp;

    if (onKeyUp) {
      onKeyUp.apply(undefined, [e].concat(args));
    }
  };

  this.onChange = function (e) {
    if (_this3.state.focused) {
      _this3.inputting = true;
    }
    var input = _this3.props.parser(_this3.getValueFromEvent(e));
    _this3.setState({ inputValue: input });
    _this3.props.onChange(_this3.toNumberWhenUserInput(input)); // valid number or invalid string
  };

  this.onFocus = function () {
    var _props3;

    _this3.setState({
      focused: true
    });
    (_props3 = _this3.props).onFocus.apply(_props3, arguments);
  };

  this.onBlur = function (e) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    _this3.inputting = false;
    _this3.setState({
      focused: false
    });
    var value = _this3.getCurrentValidValue(_this3.state.inputValue);
    e.persist(); // fix https://github.com/react-component/input-number/issues/51
    _this3.setValue(value, function () {
      var _props4;

      (_props4 = _this3.props).onBlur.apply(_props4, [e].concat(args));
    });
  };

  this.stop = function () {
    if (_this3.autoStepTimer) {
      clearTimeout(_this3.autoStepTimer);
    }
  };

  this.down = function (e, ratio, recursive) {
    _this3.pressingUpOrDown = true;
    _this3.step('down', e, ratio, recursive);
  };

  this.up = function (e, ratio, recursive) {
    _this3.pressingUpOrDown = true;
    _this3.step('up', e, ratio, recursive);
  };

  this.saveInput = function (node) {
    _this3.input = node;
  };

  this.renderSuffix = function () {
    var props = (0, _extends3['default'])({}, _this3.props);
    var prefixCls = props.prefixCls,
        disabled = props.disabled,
        readOnly = props.readOnly,
        useTouch = props.useTouch;

    var upDisabledClass = '';
    var downDisabledClass = '';
    var value = _this3.state.value;

    if (value || value === 0) {
      if (!isNaN(value)) {
        var val = Number(value);
        if (val >= props.max) {
          upDisabledClass = prefixCls + '-handler-up-disabled';
        }
        if (val <= props.min) {
          downDisabledClass = prefixCls + '-handler-down-disabled';
        }
      } else {
        upDisabledClass = prefixCls + '-handler-up-disabled';
        downDisabledClass = prefixCls + '-handler-down-disabled';
      }
    }
    var editable = !props.readOnly && !props.disabled;
    var upEvents = void 0;
    var downEvents = void 0;
    if (useTouch) {
      upEvents = {
        onTouchStart: editable && !upDisabledClass ? _this3.up : _noop2['default'],
        onTouchEnd: _this3.stop
      };
      downEvents = {
        onTouchStart: editable && !downDisabledClass ? _this3.down : _noop2['default'],
        onTouchEnd: _this3.stop
      };
    } else {
      upEvents = {
        onMouseDown: editable && !upDisabledClass ? _this3.up : _noop2['default'],
        onMouseUp: _this3.stop,
        onMouseLeave: _this3.stop
      };
      downEvents = {
        onMouseDown: editable && !downDisabledClass ? _this3.down : _noop2['default'],
        onMouseUp: _this3.stop,
        onMouseLeave: _this3.stop
      };
    }
    var isUpDisabled = !!upDisabledClass || disabled || readOnly;
    var isDownDisabled = !!downDisabledClass || disabled || readOnly;
    return _react2['default'].createElement(
      'div',
      { className: prefixCls + '-handler-wrap' },
      _react2['default'].createElement(
        _InputHandler2['default'],
        (0, _extends3['default'])({
          ref: 'up',
          disabled: isUpDisabled,
          prefixCls: prefixCls,
          unselectable: 'unselectable'
        }, upEvents, {
          role: 'button',
          'aria-label': 'Increase Value',
          'aria-disabled': !!isUpDisabled,
          className: prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass
        }),
        _this3.props.upHandler || _react2['default'].createElement(_icon2['default'], {
          unselectable: 'unselectable',
          type: 'baseline-arrow_drop_up',
          className: prefixCls + '-handler-up-inner',
          onClick: _EventManager.preventDefault
        })
      ),
      _react2['default'].createElement(
        _InputHandler2['default'],
        (0, _extends3['default'])({
          ref: 'down',
          disabled: isDownDisabled,
          prefixCls: prefixCls,
          unselectable: 'unselectable'
        }, downEvents, {
          role: 'button',
          'aria-label': 'Decrease Value',
          'aria-disabled': !!isDownDisabled,
          className: prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass
        }),
        _this3.props.downHandler || _react2['default'].createElement(_icon2['default'], {
          unselectable: 'unselectable',
          type: 'baseline-arrow_drop_down',
          className: prefixCls + '-handler-down-inner',
          onClick: _EventManager.preventDefault
        })
      )
    );
  };
};

exports['default'] = InputNumber;
module.exports = exports['default'];