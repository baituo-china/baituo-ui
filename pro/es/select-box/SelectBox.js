import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { action, computed, isArrayLike } from 'mobx';
import omit from 'lodash/omit';
import { Select } from '../select/Select';
import Radio from '../radio/Radio';
import CheckBox from '../check-box/CheckBox';
import autobind from '../_util/autobind';
import Option from '../option/Option';
import OptGroup from '../option/OptGroup';
import { $l } from '../locale-context';
var GroupIdGen = /*#__PURE__*/_regeneratorRuntime.mark(function _callee(id) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 5;
                        break;
                    }

                    _context.next = 3;
                    return '__group-' + id++ + '__';

                case 3:
                    _context.next = 0;
                    break;

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})(1);
var SelectBox = function (_Select) {
    _inherits(SelectBox, _Select);

    function SelectBox() {
        _classCallCheck(this, SelectBox);

        return _possibleConstructorReturn(this, (SelectBox.__proto__ || Object.getPrototypeOf(SelectBox)).apply(this, arguments));
    }

    _createClass(SelectBox, [{
        key: 'setName',
        value: function setName(name) {
            _get(SelectBox.prototype.__proto__ || Object.getPrototypeOf(SelectBox.prototype), 'setName', this).call(this, name || this.name || GroupIdGen.next().value);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(SelectBox.prototype.__proto__ || Object.getPrototypeOf(SelectBox.prototype), 'getOtherProps', this).call(this), ['vertical']);
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var prefixCls = this.prefixCls,
                vertical = this.props.vertical;

            return _get(SelectBox.prototype.__proto__ || Object.getPrototypeOf(SelectBox.prototype), 'getClassName', this).call(this, _defineProperty({}, prefixCls + '-vertical', vertical));
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return false;
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            var _this2 = this;

            var options = this.options,
                textField = this.textField,
                valueField = this.valueField;
            var _props = this.props,
                autoFocus = _props.autoFocus,
                mode = _props.mode;

            var items = options.data.map(function (record, index) {
                return _this2.renderItem({
                    key: index,
                    dataSet: null,
                    record: null,
                    value: record.get(valueField),
                    checked: _this2.isChecked(_this2.getValue(), record.get(valueField)),
                    name: _this2.name,
                    onChange: _this2.handleItemChange,
                    children: record.get(textField),
                    autoFocus: autoFocus && index === 0,
                    readOnly: _this2.isReadOnly(),
                    disabled: _this2.isDisabled(),
                    mode: mode,
                    noValidate: true,
                    labelLayout: "none" /* none */
                });
            });

            var _getOtherProps = this.getOtherProps(),
                className = _getOtherProps.className;

            var Element = this.context.formNode ? 'div' : 'form';
            return React.createElement(
                'span',
                _extends({ key: 'wrapper' }, this.getWrapperProps()),
                React.createElement(
                    Element,
                    { className: className },
                    items
                ),
                this.renderFloatLabel()
            );
        }
    }, {
        key: 'handleItemChange',
        value: function handleItemChange(value, oldValue) {
            if (this.multiple) {
                var values = this.getValues();
                if (!value) {
                    values.splice(values.indexOf(oldValue), 1);
                } else {
                    values.push(value);
                }
                this.setValue(values);
            } else {
                this.setValue(value);
            }
        }
    }, {
        key: 'isChecked',
        value: function isChecked(value, checkedValue) {
            if (isArrayLike(value)) {
                return value.indexOf(checkedValue) !== -1;
            } else {
                return value === checkedValue;
            }
        }
    }, {
        key: 'renderItem',
        value: function renderItem(props) {
            if (this.multiple) {
                return React.createElement(CheckBox, props);
            } else {
                return React.createElement(Radio, props);
            }
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: $l('SelectBox', label ? 'value_missing_with_label' : 'value_missing', { label: label })
            };
        }
    }]);

    return SelectBox;
}(Select);
SelectBox.displayName = 'SelectBox';
SelectBox.propTypes = _extends({
    /**
     * 是否垂直显示
     */
    vertical: PropTypes.bool
}, Select.propTypes);
SelectBox.defaultProps = _extends({}, Select.defaultProps, {
    suffixCls: 'select-box',
    vertical: false
});
SelectBox.Option = Option;
SelectBox.OptGroup = OptGroup;
tslib_1.__decorate([computed], SelectBox.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([action], SelectBox.prototype, "setName", null);
tslib_1.__decorate([autobind], SelectBox.prototype, "handleItemChange", null);
SelectBox = tslib_1.__decorate([observer], SelectBox);
export default SelectBox;