'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isNil = require('lodash/isNil');

var _isNil2 = _interopRequireDefault(_isNil);

var _FormField2 = require('../field/FormField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _utils = require('../field/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Output = function (_FormField) {
    (0, _inherits3['default'])(Output, _FormField);

    function Output() {
        (0, _classCallCheck3['default'])(this, Output);
        return (0, _possibleConstructorReturn3['default'])(this, (Output.__proto__ || Object.getPrototypeOf(Output)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Output, [{
        key: 'handleChange',
        value: function handleChange() {}
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(Output.prototype.__proto__ || Object.getPrototypeOf(Output.prototype), 'getOtherProps', this).call(this), ['name']);
        }
    }, {
        key: 'getText',
        value: function getText() {
            return this.processText(this.processValue(this.getValue()));
        }
    }, {
        key: 'processValue',
        value: function processValue(value) {
            if (!(0, _isNil2['default'])(value)) {
                value = (0, _get3['default'])(Output.prototype.__proto__ || Object.getPrototypeOf(Output.prototype), 'processValue', this).call(this, value);
                var field = this.field,
                    lang = this.lang;

                if (field) {
                    return (0, _utils2['default'])(value, field, lang, true);
                }
            }
            return value;
        }
    }, {
        key: 'getRenderedValue',
        value: function getRenderedValue() {
            var field = this.field;

            if (field) {
                var multiple = field.get('multiple');
                if (multiple) {
                    return this.renderMultipleValues(true);
                }
            }
            return this.getText();
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return _react2['default'].createElement(
                'span',
                this.getMergedProps(),
                this.getRenderedValue()
            );
        }
    }, {
        key: 'editable',
        get: function get() {
            return false;
        }
    }]);
    return Output;
}(_FormField2.FormField);
Output.displayName = 'Output';
Output.defaultProps = (0, _extends3['default'])({}, _FormField2.FormField.defaultProps, {
    suffixCls: 'output'
});
tslib_1.__decorate([_mobx.computed], Output.prototype, "editable", null);
tslib_1.__decorate([_autobind2['default']], Output.prototype, "handleChange", null);
Output = tslib_1.__decorate([_mobxReact.observer], Output);
exports['default'] = Output;
module.exports = exports['default'];