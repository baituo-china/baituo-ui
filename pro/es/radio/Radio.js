import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { action, computed } from 'mobx';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import { FormField } from '../field/FormField';
import autobind from '../_util/autobind';
import { $l } from '../locale-context';
export var Radio = function (_FormField) {
    _inherits(Radio, _FormField);

    function Radio() {
        _classCallCheck(this, Radio);

        var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));

        _this.type = 'radio';
        return _this;
    }

    _createClass(Radio, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'getOtherProps', this).call(this), ['value', 'readOnly', 'mode']);
            otherProps.type = this.type;
            // if (this.isReadOnly()) {
            //   otherProps.disabled = true;
            // }
            otherProps.onMouseDown = this.handleMouseDown;
            otherProps.onClick = otherProps.onChange;
            otherProps.onChange = noop;
            return otherProps;
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            var checked = this.isChecked();
            return React.createElement(
                'label',
                _extends({ key: 'wrapper' }, this.getWrapperProps()),
                React.createElement('input', _extends({}, this.getOtherProps(), { checked: checked, value: this.checkedValue })),
                this.renderInner(),
                this.getText(),
                this.renderFloatLabel()
            );
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            return React.createElement('span', { className: this.prefixCls + '-inner' });
        }
        /**
         * 当使用label代替children时，不需要展示float label
         *
         * @readonly
         * @memberof Radio
         */

    }, {
        key: 'getLabelChildren',

        /**
         * 没有children时，使用label替代children
         *
         * @returns {ReactNode} label
         * @memberof Radio
         */
        value: function getLabelChildren() {
            var labelLayout = this.labelLayout;

            return labelLayout && !["horizontal" /* horizontal */, "vertical" /* vertical */, "none" /* none */].includes(labelLayout) && this.getLabel();
        }
    }, {
        key: 'getChildrenText',
        value: function getChildrenText() {
            return this.props.children;
        }
    }, {
        key: 'getText',
        value: function getText() {
            var prefixCls = this.prefixCls;

            var text = this.getChildrenText() || this.getLabelChildren();
            if (text) {
                return React.createElement(
                    'span',
                    { className: prefixCls + '-label' },
                    text
                );
            }
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var _get2;

            var prefixCls = this.prefixCls,
                mode = this.props.mode;

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return (_get2 = _get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this, _defineProperty({}, prefixCls + '-button', mode === "button")].concat(args));
        }
    }, {
        key: 'isChecked',
        value: function isChecked() {
            var checked = this.props.checked;
            var name = this.name,
                dataSet = this.dataSet,
                checkedValue = this.checkedValue;

            if (dataSet && name) {
                return this.getDataSetValue() === checkedValue;
            } else {
                return checked;
            }
        }
    }, {
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            // e.stopPropagation();
            var onMouseDown = this.props.onMouseDown;

            if (typeof onMouseDown === 'function') {
                onMouseDown(e);
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _props$onClick = this.props.onClick,
                onClick = _props$onClick === undefined ? noop : _props$onClick;
            var checked = e.target.checked;

            onClick(e);
            this.setChecked(checked);
        }
    }, {
        key: 'setChecked',
        value: function setChecked(checked) {
            if (checked) {
                this.setValue(this.checkedValue);
            }
        }
    }, {
        key: 'getOldValue',
        value: function getOldValue() {
            return this.isChecked() ? this.checkedValue : void 0;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: $l('Radio', label ? 'value_missing_with_label' : 'value_missing', { label: label })
            };
        }
    }, {
        key: 'checkedValue',
        get: function get() {
            var _props$value = this.props.value,
                value = _props$value === undefined ? 'on' : _props$value;

            return value;
        }
    }, {
        key: 'isControlled',
        get: function get() {
            return this.props.checked !== void 0;
        }
    }, {
        key: 'hasFloatLabel',
        get: function get() {
            return this.getLabelChildren() ? false : _get(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'hasFloatLabel', this);
        }
    }]);

    return Radio;
}(FormField);
Radio.displayName = 'Radio';
Radio.propTypes = _extends({
    /**
     * <受控>是否选中
     */
    checked: PropTypes.bool,
    /**
     * 初始是否选中
     */
    defaultChecked: PropTypes.bool,
    /**
     * 显示模式
     * 可选值： button | box
     * @default box
     */
    mode: PropTypes.oneOf(["button" /* button */
    , "box" /* box */
    ])
}, FormField.propTypes);
Radio.defaultProps = _extends({}, FormField.defaultProps, {
    suffixCls: 'radio'
});
tslib_1.__decorate([computed], Radio.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([autobind], Radio.prototype, "handleMouseDown", null);
tslib_1.__decorate([autobind], Radio.prototype, "handleChange", null);
tslib_1.__decorate([action], Radio.prototype, "setChecked", null);
var ObserverRadio = function (_Radio) {
    _inherits(ObserverRadio, _Radio);

    function ObserverRadio() {
        _classCallCheck(this, ObserverRadio);

        return _possibleConstructorReturn(this, (ObserverRadio.__proto__ || Object.getPrototypeOf(ObserverRadio)).apply(this, arguments));
    }

    return ObserverRadio;
}(Radio);
ObserverRadio.defaultProps = Radio.defaultProps;
ObserverRadio = tslib_1.__decorate([observer], ObserverRadio);
export default ObserverRadio;