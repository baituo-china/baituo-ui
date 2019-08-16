'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = require('../_util/warning');

var _warning2 = _interopRequireDefault(_warning);

var _constants = require('./constants');

var _PureRenderMixin = require('../rc-components/util/PureRenderMixin');

var _PureRenderMixin2 = _interopRequireDefault(_PureRenderMixin);

var _animate = require('../animate');

var _animate2 = _interopRequireDefault(_animate);

var _configure = require('../configure');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FormItem = function (_Component) {
    (0, _inherits3['default'])(FormItem, _Component);

    function FormItem() {
        (0, _classCallCheck3['default'])(this, FormItem);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).apply(this, arguments));

        _this.state = { helpShow: false };
        _this.onHelpAnimEnd = function (_key, helpShow) {
            _this.setState({ helpShow: helpShow });
        };
        // Resolve duplicated ids bug between different forms
        _this.onLabelClick = function (e) {
            var label = _this.props.label;

            var id = _this.props.id || _this.getId();
            if (!id) {
                return;
            }
            var controls = document.querySelectorAll('[id="' + id + '"]');
            if (controls.length !== 1) {
                // Only prevent in default situation
                // Avoid preventing event in `label={<a href="xx">link</a>}``
                if (typeof label === 'string') {
                    e.preventDefault();
                }
                var control = (0, _reactDom.findDOMNode)(_this).querySelector('[id="' + id + '"]');
                if (control && control.focus) {
                    control.focus();
                }
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(FormItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _warning2['default'])(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' + 'while there are more than one `getFieldDecorator` in it.');
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return _PureRenderMixin2['default'].shouldComponentUpdate.apply(this, args);
        }
    }, {
        key: 'getHelpMsg',
        value: function getHelpMsg() {
            var props = this.props;
            var onlyControl = this.getOnlyControl();
            if (props.help === undefined && onlyControl) {
                var errors = this.getField().errors;
                return errors ? errors.map(function (e) {
                    return e.message;
                }).join(', ') : '';
            }
            return props.help;
        }
    }, {
        key: 'getControls',
        value: function getControls(children, recursively) {
            var controls = [];
            var childrenArray = _react.Children.toArray(children);
            for (var i = 0; i < childrenArray.length; i++) {
                if (!recursively && controls.length > 0) {
                    break;
                }
                var child = childrenArray[i];
                if (child.type && (child.type === FormItem || child.type.displayName === 'FormItem')) {
                    continue;
                }
                if (!child.props) {
                    continue;
                }
                if (_constants.FIELD_META_PROP in child.props) {
                    // And means FIELD_DATA_PROP in chidl.props, too.
                    controls.push(child);
                } else if (child.props.children) {
                    controls = controls.concat(this.getControls(child.props.children, recursively));
                }
            }
            return controls;
        }
    }, {
        key: 'getOnlyControl',
        value: function getOnlyControl() {
            var child = this.getControls(this.props.children, false)[0];
            return child !== undefined ? child : null;
        }
    }, {
        key: 'getChildProp',
        value: function getChildProp(prop) {
            var child = this.getOnlyControl();
            return child && child.props && child.props[prop];
        }
    }, {
        key: 'getId',
        value: function getId() {
            return this.getChildProp('id');
        }
    }, {
        key: 'getMeta',
        value: function getMeta() {
            return this.getChildProp(_constants.FIELD_META_PROP);
        }
    }, {
        key: 'getField',
        value: function getField() {
            return this.getChildProp(_constants.FIELD_DATA_PROP);
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return (0, _configure.getPrefixCls)('form', this.props.prefixCls);
        }
    }, {
        key: 'renderHelp',
        value: function renderHelp() {
            var prefixCls = this.getPrefixCls();
            var help = this.getHelpMsg();
            var children = help ? _react2['default'].createElement(
                'div',
                { className: prefixCls + '-explain', key: 'error' },
                help
            ) : null;
            return _react2['default'].createElement(
                _animate2['default'],
                { transitionName: 'show-error', component: '', transitionAppear: true, key: 'error', onEnd: this.onHelpAnimEnd },
                children
            );
        }
    }, {
        key: 'renderExtra',
        value: function renderExtra() {
            var extra = this.props.extra;

            var prefixCls = this.getPrefixCls();
            return extra ? _react2['default'].createElement(
                'div',
                { className: prefixCls + '-extra' },
                extra
            ) : null;
        }
    }, {
        key: 'getValidateStatus',
        value: function getValidateStatus() {
            var onlyControl = this.getOnlyControl();
            if (onlyControl) {
                var field = this.getField();
                if (field.validating) {
                    return "validating" /* validating */;
                }
                if (field.errors) {
                    return "error" /* error */;
                }
                var fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
                if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                    return "success" /* success */;
                }
            }
        }
    }, {
        key: 'renderValidateWrapper',
        value: function renderValidateWrapper(c1, c2, c3) {
            var props = this.props;
            var prefixCls = this.getPrefixCls();
            var onlyControl = this.getOnlyControl();
            var validateStatus = props.validateStatus === undefined && onlyControl ? this.getValidateStatus() : props.validateStatus;
            var classes = prefixCls + '-item-control';
            if (validateStatus) {
                classes = (0, _classnames2['default'])(prefixCls + '-item-control', {
                    'has-feedback': props.hasFeedback || validateStatus === "validating" /* validating */
                    , 'has-success': validateStatus === "success" /* success */
                    , 'has-warning': validateStatus === "warning" /* warning */
                    , 'has-error': validateStatus === "error" /* error */
                    , 'is-validating': validateStatus === "validating" /* validating */
                });
            }
            return _react2['default'].createElement(
                'div',
                { className: classes },
                _react2['default'].createElement(
                    'span',
                    { className: prefixCls + '-item-children' },
                    c1
                ),
                c2,
                c3
            );
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper(children) {
            var wrapperCol = this.props.wrapperCol;

            var prefixCls = this.getPrefixCls();
            var required = this.isRequired();
            var className = (0, _classnames2['default'])(prefixCls + '-item-control-wrapper', wrapperCol && wrapperCol.className, {
                'is-required': required
            });
            return _react2['default'].createElement(
                'div',
                { className: className, key: 'wrapper' },
                children
            );
        }
    }, {
        key: 'isRequired',
        value: function isRequired() {
            var required = this.props.required;

            if (required !== undefined) {
                return required;
            }
            if (this.getOnlyControl()) {
                var meta = this.getMeta() || {};
                var validate = meta.validate || [];
                return validate.filter(function (item) {
                    return !!item.rules;
                }).some(function (item) {
                    return item.rules.some(function (rule) {
                        return rule.required;
                    });
                });
            }
            return false;
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            var children = this.props.children;

            return [
            // this.renderLabel(),
            this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), this.renderExtra()))];
        }
    }, {
        key: 'renderFormItem',
        value: function renderFormItem(children) {
            var _itemClassName;

            var props = this.props;
            var prefixCls = this.getPrefixCls();
            var style = props.style;
            var itemClassName = (_itemClassName = {}, (0, _defineProperty3['default'])(_itemClassName, prefixCls + '-item', true), (0, _defineProperty3['default'])(_itemClassName, prefixCls + '-item-with-help', !!this.getHelpMsg() || this.state.helpShow), (0, _defineProperty3['default'])(_itemClassName, prefixCls + '-item-no-colon', !props.colon), (0, _defineProperty3['default'])(_itemClassName, '' + props.className, !!props.className), _itemClassName);
            return _react2['default'].createElement(
                'div',
                { className: (0, _classnames2['default'])(itemClassName), style: style },
                children
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.renderChildren();
            return this.renderFormItem(children);
        }
    }]);
    return FormItem;
}(_react.Component);

exports['default'] = FormItem;

FormItem.displayName = 'FormItem';
FormItem.defaultProps = {
    hasFeedback: false,
    colon: true
};
FormItem.propTypes = {
    prefixCls: _propTypes2['default'].string,
    label: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].node]),
    labelCol: _propTypes2['default'].object,
    help: _propTypes2['default'].oneOfType([_propTypes2['default'].node, _propTypes2['default'].bool]),
    validateStatus: _propTypes2['default'].oneOf(["success" /* success */
    , "warning" /* warning */
    , "error" /* error */
    , "validating" /* validating */
    ]),
    hasFeedback: _propTypes2['default'].bool,
    wrapperCol: _propTypes2['default'].object,
    className: _propTypes2['default'].string,
    id: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    colon: _propTypes2['default'].bool
};
FormItem.contextTypes = {
    vertical: _propTypes2['default'].bool
};
module.exports = exports['default'];