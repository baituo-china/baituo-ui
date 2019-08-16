'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

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

var _get3 = require('babel-runtime/helpers/get');

var _get4 = _interopRequireDefault(_get3);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _FormField2 = require('../field/FormField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Radio = exports.Radio = function (_FormField) {
    (0, _inherits3['default'])(Radio, _FormField);

    function Radio() {
        (0, _classCallCheck3['default'])(this, Radio);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));

        _this.type = 'radio';
        return _this;
    }

    (0, _createClass3['default'])(Radio, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get4['default'])(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'getOtherProps', this).call(this), ['value', 'readOnly', 'mode']);
            otherProps.type = this.type;
            // if (this.isReadOnly()) {
            //   otherProps.disabled = true;
            // }
            otherProps.onMouseDown = this.handleMouseDown;
            otherProps.onClick = otherProps.onChange;
            otherProps.onChange = _noop2['default'];
            return otherProps;
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            var checked = this.isChecked();
            return _react2['default'].createElement(
                'label',
                (0, _extends3['default'])({ key: 'wrapper' }, this.getWrapperProps()),
                _react2['default'].createElement('input', (0, _extends3['default'])({}, this.getOtherProps(), { checked: checked, value: this.checkedValue })),
                this.renderInner(),
                this.getText(),
                this.renderFloatLabel()
            );
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            return _react2['default'].createElement('span', { className: this.prefixCls + '-inner' });
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
                return _react2['default'].createElement(
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

            return (_get2 = (0, _get4['default'])(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'getWrapperClassNames', this)).call.apply(_get2, [this, (0, _defineProperty3['default'])({}, prefixCls + '-button', mode === "button")].concat(args));
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
                onClick = _props$onClick === undefined ? _noop2['default'] : _props$onClick;
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
                valueMissing: (0, _localeContext.$l)('Radio', label ? 'value_missing_with_label' : 'value_missing', { label: label })
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
            return this.getLabelChildren() ? false : (0, _get4['default'])(Radio.prototype.__proto__ || Object.getPrototypeOf(Radio.prototype), 'hasFloatLabel', this);
        }
    }]);
    return Radio;
}(_FormField2.FormField);

Radio.displayName = 'Radio';
Radio.propTypes = (0, _extends3['default'])({
    /**
     * <受控>是否选中
     */
    checked: _propTypes2['default'].bool,
    /**
     * 初始是否选中
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 显示模式
     * 可选值： button | box
     * @default box
     */
    mode: _propTypes2['default'].oneOf(["button" /* button */
    , "box" /* box */
    ])
}, _FormField2.FormField.propTypes);
Radio.defaultProps = (0, _extends3['default'])({}, _FormField2.FormField.defaultProps, {
    suffixCls: 'radio'
});
tslib_1.__decorate([_mobx.computed], Radio.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_autobind2['default']], Radio.prototype, "handleMouseDown", null);
tslib_1.__decorate([_autobind2['default']], Radio.prototype, "handleChange", null);
tslib_1.__decorate([_mobx.action], Radio.prototype, "setChecked", null);
var ObserverRadio = function (_Radio) {
    (0, _inherits3['default'])(ObserverRadio, _Radio);

    function ObserverRadio() {
        (0, _classCallCheck3['default'])(this, ObserverRadio);
        return (0, _possibleConstructorReturn3['default'])(this, (ObserverRadio.__proto__ || Object.getPrototypeOf(ObserverRadio)).apply(this, arguments));
    }

    return ObserverRadio;
}(Radio);
ObserverRadio.defaultProps = Radio.defaultProps;
ObserverRadio = tslib_1.__decorate([_mobxReact.observer], ObserverRadio);
exports['default'] = ObserverRadio;