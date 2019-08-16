import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from '../_util/warning';
import { FIELD_DATA_PROP, FIELD_META_PROP } from './constants';
import PureRenderMixin from '../rc-components/util/PureRenderMixin';
import Animate from '../animate';
import { getPrefixCls as _getPrefixCls } from '../configure';

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem() {
        _classCallCheck(this, FormItem);

        var _this = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).apply(this, arguments));

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
                var control = findDOMNode(_this).querySelector('[id="' + id + '"]');
                if (control && control.focus) {
                    control.focus();
                }
            }
        };
        return _this;
    }

    _createClass(FormItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            warning(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' + 'while there are more than one `getFieldDecorator` in it.');
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return PureRenderMixin.shouldComponentUpdate.apply(this, args);
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
            var childrenArray = Children.toArray(children);
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
                if (FIELD_META_PROP in child.props) {
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
            return this.getChildProp(FIELD_META_PROP);
        }
    }, {
        key: 'getField',
        value: function getField() {
            return this.getChildProp(FIELD_DATA_PROP);
        }
    }, {
        key: 'getPrefixCls',
        value: function getPrefixCls() {
            return _getPrefixCls('form', this.props.prefixCls);
        }
    }, {
        key: 'renderHelp',
        value: function renderHelp() {
            var prefixCls = this.getPrefixCls();
            var help = this.getHelpMsg();
            var children = help ? React.createElement(
                'div',
                { className: prefixCls + '-explain', key: 'error' },
                help
            ) : null;
            return React.createElement(
                Animate,
                { transitionName: 'show-error', component: '', transitionAppear: true, key: 'error', onEnd: this.onHelpAnimEnd },
                children
            );
        }
    }, {
        key: 'renderExtra',
        value: function renderExtra() {
            var extra = this.props.extra;

            var prefixCls = this.getPrefixCls();
            return extra ? React.createElement(
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
                classes = classNames(prefixCls + '-item-control', {
                    'has-feedback': props.hasFeedback || validateStatus === "validating" /* validating */
                    , 'has-success': validateStatus === "success" /* success */
                    , 'has-warning': validateStatus === "warning" /* warning */
                    , 'has-error': validateStatus === "error" /* error */
                    , 'is-validating': validateStatus === "validating" /* validating */
                });
            }
            return React.createElement(
                'div',
                { className: classes },
                React.createElement(
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
            var className = classNames(prefixCls + '-item-control-wrapper', wrapperCol && wrapperCol.className, {
                'is-required': required
            });
            return React.createElement(
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
            var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, prefixCls + '-item', true), _defineProperty(_itemClassName, prefixCls + '-item-with-help', !!this.getHelpMsg() || this.state.helpShow), _defineProperty(_itemClassName, prefixCls + '-item-no-colon', !props.colon), _defineProperty(_itemClassName, '' + props.className, !!props.className), _itemClassName);
            return React.createElement(
                'div',
                { className: classNames(itemClassName), style: style },
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
}(Component);

export default FormItem;

FormItem.displayName = 'FormItem';
FormItem.defaultProps = {
    hasFeedback: false,
    colon: true
};
FormItem.propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(["success" /* success */
    , "warning" /* warning */
    , "error" /* error */
    , "validating" /* validating */
    ]),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool
};
FormItem.contextTypes = {
    vertical: PropTypes.bool
};