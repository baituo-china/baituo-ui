'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Select2 = require('../select/Select');

var _Radio = require('../radio/Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _CheckBox = require('../check-box/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _Option = require('../option/Option');

var _Option2 = _interopRequireDefault(_Option);

var _OptGroup = require('../option/OptGroup');

var _OptGroup2 = _interopRequireDefault(_OptGroup);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GroupIdGen = /*#__PURE__*/_regenerator2['default'].mark(function _callee(id) {
    return _regenerator2['default'].wrap(function _callee$(_context) {
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
    (0, _inherits3['default'])(SelectBox, _Select);

    function SelectBox() {
        (0, _classCallCheck3['default'])(this, SelectBox);
        return (0, _possibleConstructorReturn3['default'])(this, (SelectBox.__proto__ || Object.getPrototypeOf(SelectBox)).apply(this, arguments));
    }

    (0, _createClass3['default'])(SelectBox, [{
        key: 'setName',
        value: function setName(name) {
            (0, _get3['default'])(SelectBox.prototype.__proto__ || Object.getPrototypeOf(SelectBox.prototype), 'setName', this).call(this, name || this.name || GroupIdGen.next().value);
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(SelectBox.prototype.__proto__ || Object.getPrototypeOf(SelectBox.prototype), 'getOtherProps', this).call(this), ['vertical']);
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var prefixCls = this.prefixCls,
                vertical = this.props.vertical;

            return (0, _get3['default'])(SelectBox.prototype.__proto__ || Object.getPrototypeOf(SelectBox.prototype), 'getClassName', this).call(this, (0, _defineProperty3['default'])({}, prefixCls + '-vertical', vertical));
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
            return _react2['default'].createElement(
                'span',
                (0, _extends3['default'])({ key: 'wrapper' }, this.getWrapperProps()),
                _react2['default'].createElement(
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
            if ((0, _mobx.isArrayLike)(value)) {
                return value.indexOf(checkedValue) !== -1;
            } else {
                return value === checkedValue;
            }
        }
    }, {
        key: 'renderItem',
        value: function renderItem(props) {
            if (this.multiple) {
                return _react2['default'].createElement(_CheckBox2['default'], props);
            } else {
                return _react2['default'].createElement(_Radio2['default'], props);
            }
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: (0, _localeContext.$l)('SelectBox', label ? 'value_missing_with_label' : 'value_missing', { label: label })
            };
        }
    }]);
    return SelectBox;
}(_Select2.Select);
SelectBox.displayName = 'SelectBox';
SelectBox.propTypes = (0, _extends3['default'])({
    /**
     * 是否垂直显示
     */
    vertical: _propTypes2['default'].bool
}, _Select2.Select.propTypes);
SelectBox.defaultProps = (0, _extends3['default'])({}, _Select2.Select.defaultProps, {
    suffixCls: 'select-box',
    vertical: false
});
SelectBox.Option = _Option2['default'];
SelectBox.OptGroup = _OptGroup2['default'];
tslib_1.__decorate([_mobx.computed], SelectBox.prototype, "defaultValidationMessages", null);
tslib_1.__decorate([_mobx.action], SelectBox.prototype, "setName", null);
tslib_1.__decorate([_autobind2['default']], SelectBox.prototype, "handleItemChange", null);
SelectBox = tslib_1.__decorate([_mobxReact.observer], SelectBox);
exports['default'] = SelectBox;
module.exports = exports['default'];