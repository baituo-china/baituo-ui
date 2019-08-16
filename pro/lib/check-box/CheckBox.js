'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckBox = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _Radio2 = require('../radio/Radio');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CheckBox = exports.CheckBox = function (_Radio) {
    (0, _inherits3['default'])(CheckBox, _Radio);

    function CheckBox(props, context) {
        (0, _classCallCheck3['default'])(this, CheckBox);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).call(this, props, context));

        _this.type = 'checkbox';
        (0, _mobx.runInAction)(function () {
            _this.value = _this.props.defaultChecked ? _this.checkedValue : _this.unCheckedValue;
        });
        return _this;
    }

    (0, _createClass3['default'])(CheckBox, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'getOtherProps', this).call(this), ['defaultChecked', 'unCheckedValue', 'unCheckedChildren', 'indeterminate']);
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            return _react2['default'].createElement('i', { className: this.prefixCls + '-inner' });
        }
    }, {
        key: 'getChildrenText',
        value: function getChildrenText() {
            var _props = this.props,
                children = _props.children,
                unCheckedChildren = _props.unCheckedChildren;

            return this.isChecked() ? children : unCheckedChildren || children;
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var prefixCls = this.prefixCls,
                indeterminate = this.props.indeterminate;

            return (0, _get3['default'])(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'getWrapperClassNames', this).call(this, (0, _defineProperty3['default'])({}, prefixCls + '-indeterminate', indeterminate));
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            var _props2 = this.props,
                checked = _props2.checked,
                indeterminate = _props2.indeterminate;

            if (indeterminate) {
                return false;
            }
            var name = this.name,
                dataSet = this.dataSet,
                checkedValue = this.checkedValue;

            if (dataSet && name) {
                return this.getValues().indexOf(checkedValue) !== -1;
            } else if (checked !== void 0) {
                return checked;
            } else {
                return this.value === checkedValue;
            }
        }
    }, {
        key: 'getDataSetValues',
        value: function getDataSetValues() {
            var values = this.getDataSetValue();
            if (values === void 0) {
                return [];
            } else {
                return [].concat(values);
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var record = this.record,
                checkedValue = this.checkedValue,
                multiple = this.multiple;

            if (record) {
                var values = void 0;
                if (multiple) {
                    values = this.getValues();
                    if (value === checkedValue) {
                        values.push(value);
                    } else {
                        var index = values.indexOf(checkedValue);
                        if (index !== -1) {
                            values.splice(index, 1);
                        }
                    }
                } else {
                    values = value;
                }
                (0, _get3['default'])(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'setValue', this).call(this, values);
            } else {
                (0, _get3['default'])(CheckBox.prototype.__proto__ || Object.getPrototypeOf(CheckBox.prototype), 'setValue', this).call(this, value);
            }
        }
    }, {
        key: 'setChecked',
        value: function setChecked(checked) {
            this.setValue(checked ? this.checkedValue : this.unCheckedValue);
        }
    }, {
        key: 'getOldValue',
        value: function getOldValue() {
            return this.isChecked() ? this.checkedValue : this.unCheckedValue;
        }
    }, {
        key: 'unCheckedValue',
        get: function get() {
            var unCheckedValue = this.props.unCheckedValue;

            if (unCheckedValue !== void 0) {
                return unCheckedValue;
            } else {
                var field = this.field;

                if (field) {
                    return field.get("falseValue" /* falseValue */);
                }
            }
            return false;
        }
    }, {
        key: 'checkedValue',
        get: function get() {
            var value = this.props.value;

            if (value !== void 0) {
                return value;
            } else {
                var field = this.field;

                if (field) {
                    return field.get("trueValue" /* trueValue */);
                }
            }
            return true;
        }
    }]);
    return CheckBox;
}(_Radio2.Radio);

CheckBox.displayName = 'CheckBox';
CheckBox.propTypes = (0, _extends3['default'])({
    /**
     * 中间状态
     */
    indeterminate: _propTypes2['default'].bool,
    /**
     * 未选中时的值
     */
    unCheckedValue: _propTypes2['default'].any,
    /**
     * 未选中时的内容
     */
    unCheckedChildren: _propTypes2['default'].node,
    defaultChecked: _propTypes2['default'].bool
}, _Radio2.Radio.propTypes);
CheckBox.defaultProps = (0, _extends3['default'])({}, _Radio2.Radio.defaultProps, {
    suffixCls: 'checkbox',
    indeterminate: false
});
tslib_1.__decorate([_mobx.action], CheckBox.prototype, "setValue", null);
tslib_1.__decorate([_mobx.action], CheckBox.prototype, "setChecked", null);
var ObserverCheckBox = function (_CheckBox) {
    (0, _inherits3['default'])(ObserverCheckBox, _CheckBox);

    function ObserverCheckBox() {
        (0, _classCallCheck3['default'])(this, ObserverCheckBox);
        return (0, _possibleConstructorReturn3['default'])(this, (ObserverCheckBox.__proto__ || Object.getPrototypeOf(ObserverCheckBox)).apply(this, arguments));
    }

    return ObserverCheckBox;
}(CheckBox);
ObserverCheckBox.defaultProps = CheckBox.defaultProps;
ObserverCheckBox = tslib_1.__decorate([_mobxReact.observer], ObserverCheckBox);
exports['default'] = ObserverCheckBox;