import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import _regeneratorRuntime from 'babel-runtime/regenerator';

var _PropTypes$shape, _PropTypes$shape2, _PropTypes$shape3, _PropTypes$shape4;

import * as tslib_1 from "tslib";
import React, { Children, createElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { action as mobxAction, computed, isArrayLike, observable } from 'mobx';
import omit from 'lodash/omit';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import noop from 'lodash/noop';
import defaultTo from 'lodash/defaultTo';
import { getConfig, getProPrefixCls } from '../../../es/configure';
import axios from '../axios';
import autobind from '../_util/autobind';
import { getFieldsById } from '../field/FormField';
import FormContext from './FormContext';
import DataSetComponent from '../data-set/DataSetComponent';
import { defaultColumns, defaultLabelWidth, FIELD_SUFFIX, getProperty, normalizeLabelWidth } from './utils';
import exception from '../_util/exception';
import EventManager from '../_util/EventManager';
/**
 * 表单name生成器
 */
var NameGen = /*#__PURE__*/_regeneratorRuntime.mark(function _callee(start) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!true) {
                        _context.next = 6;
                        break;
                    }

                    start += 1;
                    _context.next = 4;
                    return 'form-' + start;

                case 4:
                    _context.next = 0;
                    break;

                case 6:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
})(0);
var labelWidthPropTypes = PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]);
var labelAlignPropTypes = PropTypes.oneOf(["left" /* left */, "center" /* center */, "right" /* right */]);
var labelLayoutPropTypes = PropTypes.oneOf(["horizontal" /* horizontal */, "vertical" /* vertical */, "placeholder" /* placeholder */, "float" /* float */]);
var Form = function (_DataSetComponent) {
    _inherits(Form, _DataSetComponent);

    function Form(props, context) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props, context));

        _this.fields = [];
        _this.resizeEvent = new EventManager(typeof window !== 'undefined' && window);
        _this.name = NameGen.next().value;
        _this.handleResize = function () {
            _this.setResponsiveKey();
        };
        _this.setResponsiveKey();
        _this.initResponsive();
        return _this;
    }

    _createClass(Form, [{
        key: 'isDisabled',
        value: function isDisabled() {
            return _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'isDisabled', this).call(this) || this.context.disabled;
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return {
                dataSet: 'dataSet' in props ? props.dataSet : context.dataSet,
                record: 'record' in props ? props.record : context.record,
                dataIndex: defaultTo(props.dataIndex, context.dataIndex),
                labelLayout: 'labelLayout' in props ? props.labelLayout : context.labelLayout,
                labelAlign: 'labelAlign' in props ? props.labelAlign : context.labelAlign,
                labelWidth: defaultTo(props.labelWidth, context.labelWidth),
                pristine: 'pristine' in props ? props.pristine : context.pristine,
                columns: props.columns
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setResponsiveKey();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props, context) {
            _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'componentWillReceiveProps', this).call(this, props, context);
            this.initResponsive();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.resizeEvent.clear();
        }
    }, {
        key: 'setResponsiveKey',
        value: function setResponsiveKey() {
            var responsiveKey = "xs" /* xs */;
            var element = this.element;

            if (element && typeof window !== 'undefined' && document.defaultView) {
                var _document$defaultView = document.defaultView.getComputedStyle(element),
                    content = _document$defaultView.content;

                if (content) {
                    try {
                        responsiveKey = JSON.parse(content);
                    } catch (e) {
                        exception(e);
                        responsiveKey = content;
                    }
                }
            }
            if (responsiveKey && responsiveKey !== this.responsiveKey) {
                this.responsiveKey = responsiveKey;
            }
        }
    }, {
        key: 'initResponsive',
        value: function initResponsive() {
            var _observableProps = this.observableProps,
                columns = _observableProps.columns,
                labelWidth = _observableProps.labelWidth,
                labelLayout = _observableProps.labelLayout,
                labelAlign = _observableProps.labelAlign;

            this.clear();
            if (!isNumber(columns) || !(isNumber(labelWidth) || isArrayLike(labelWidth)) || !isString(labelLayout) || labelAlign && !isString(labelAlign)) {
                this.resizeEvent.addEventListener('resize', this.handleResize);
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = omit(_get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'getOtherProps', this).call(this), ['record', 'dataIndex', 'onSuccess', 'onError', 'processParams', 'labelWidth', 'labelAlign', 'labelLayout', 'columns', 'axios']);
            otherProps.onSubmit = this.handleSubmit;
            otherProps.onReset = this.handleReset;
            if (!otherProps.name) {
                otherProps.name = this.name;
            }
            return otherProps;
        }
    }, {
        key: 'getHeader',
        value: function getHeader() {
            var header = this.props.header,
                prefixCls = this.prefixCls;

            if (header) {
                return React.createElement(
                    'div',
                    { key: 'form-header', className: prefixCls + '-header' },
                    header
                );
            }
        }
    }, {
        key: 'getClassName',
        value: function getClassName() {
            var prefixCls = this.prefixCls,
                labelLayout = this.labelLayout;

            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                props[_key] = arguments[_key];
            }

            return _get(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'getClassName', this).call(this, _extends({}, props, _defineProperty({}, prefixCls + '-float-label', labelLayout === "float")));
        }
    }, {
        key: 'rasterizedChildren',
        value: function rasterizedChildren() {
            var dataSet = this.dataSet,
                record = this.record,
                columns = this.columns,
                labelLayout = this.labelLayout,
                labelAlign = this.labelAlign,
                children = this.props.children;

            var prefixCls = getProPrefixCls(FIELD_SUFFIX);
            var labelWidth = normalizeLabelWidth(this.labelWidth, columns);
            var rows = [];
            var cols = [];
            var rowIndex = 0;
            var colIndex = 0;
            var matrix = [[]];
            var noLabel = true;
            var childrenArray = [];
            Children.forEach(children, function (child) {
                if (isValidElement(child)) {
                    if (noLabel === true && labelLayout === "horizontal" /* horizontal */ && getProperty(child.props, 'label', dataSet, record)) {
                        noLabel = false;
                    }
                    childrenArray.push(child);
                }
            });
            function completeLine() {
                if (cols.length) {
                    rows.push(React.createElement(
                        'tr',
                        { key: 'row-' + rowIndex },
                        cols
                    ));
                    cols = [];
                }
                rowIndex++;
                colIndex = 0;
                matrix[rowIndex] = matrix[rowIndex] || [];
            }
            for (var index = 0, len = childrenArray.length; index < len;) {
                var _classNames;

                var _childrenArray$index = childrenArray[index],
                    _props = _childrenArray$index.props,
                    key = _childrenArray$index.key,
                    type = _childrenArray$index.type;

                var label = getProperty(_props, 'label', dataSet, record);
                var required = getProperty(_props, 'required', dataSet, record);

                var _props$rowSpan = _props.rowSpan,
                    rowSpan = _props$rowSpan === undefined ? 1 : _props$rowSpan,
                    _props$colSpan = _props.colSpan,
                    colSpan = _props$colSpan === undefined ? 1 : _props$colSpan,
                    newLine = _props.newLine,
                    otherProps = _objectWithoutProperties(_props, ['rowSpan', 'colSpan', 'newLine']);

                var currentRow = matrix[rowIndex];
                if (newLine) {
                    if (colIndex !== 0) {
                        completeLine();
                        continue;
                    }
                }
                while (currentRow[colIndex]) {
                    colIndex++;
                }
                if (colIndex >= columns) {
                    completeLine();
                    continue;
                }
                if (colSpan + colIndex > columns) {
                    colSpan = columns - colIndex;
                }
                for (var i = colIndex, k = colIndex + colSpan; i < k; i++) {
                    if (currentRow[i]) {
                        colSpan = i - colIndex;
                        break;
                    }
                }
                for (var _i = rowIndex; _i < rowSpan + rowIndex; _i++) {
                    for (var j = colIndex, _k = colSpan + colIndex; j < _k; j++) {
                        if (!matrix[_i]) {
                            matrix[_i] = [];
                        }
                        matrix[_i][j] = true;
                    }
                }
                var labelClassName = classNames(prefixCls + '-label', prefixCls + '-label-' + labelAlign, (_classNames = {}, _defineProperty(_classNames, prefixCls + '-required', required), _defineProperty(_classNames, prefixCls + '-label-vertical', labelLayout === "vertical"), _classNames));
                var wrapperClassName = prefixCls + '-wrapper';
                if (!noLabel) {
                    cols.push(React.createElement(
                        'td',
                        { key: 'row-' + rowIndex + '-col-' + colIndex + '-label', className: labelClassName, rowSpan: rowSpan },
                        React.createElement(
                            'label',
                            null,
                            label
                        )
                    ));
                }
                var fieldElementProps = _extends({
                    key: key,
                    className: prefixCls,
                    placeholder: labelLayout === "placeholder" /* placeholder */ ? label : void 0
                }, otherProps);
                if (!isString(type)) {
                    fieldElementProps.rowIndex = rowIndex;
                    fieldElementProps.colIndex = colIndex;
                }
                cols.push(React.createElement(
                    'td',
                    { key: 'row-' + rowIndex + '-col-' + colIndex + '-field', colSpan: noLabel ? colSpan : colSpan * 2 - 1, rowSpan: rowSpan },
                    labelLayout === "vertical" /* vertical */ && React.createElement(
                        'label',
                        { className: labelClassName },
                        label
                    ),
                    React.createElement(
                        'div',
                        { className: wrapperClassName },
                        createElement(type, fieldElementProps)
                    )
                ));
                if (index === len - 1) {
                    completeLine();
                } else {
                    colIndex++;
                }
                index++;
            }
            cols = [];
            if (!noLabel) {
                for (var _i2 = 0; _i2 < columns; _i2++) {
                    cols.push(React.createElement('col', { key: 'label-' + _i2, style: { width: labelWidth[_i2 % columns] } }), React.createElement('col', { key: 'wrapper-' + _i2 }));
                }
            }
            return [this.getHeader(), React.createElement(
                'table',
                { key: 'form-body' },
                cols.length ? React.createElement(
                    'colgroup',
                    null,
                    cols
                ) : void 0,
                React.createElement(
                    'tbody',
                    null,
                    rows
                )
            )];
        }
    }, {
        key: 'render',
        value: function render() {
            var labelWidth = this.labelWidth,
                labelAlign = this.labelAlign,
                labelLayout = this.labelLayout,
                pristine = this.pristine,
                dataSet = this.dataSet,
                record = this.record,
                dataIndex = this.dataIndex;
            var formNode = this.context.formNode;

            var value = {
                formNode: formNode || this,
                dataSet: dataSet,
                dataIndex: dataIndex,
                record: record,
                labelWidth: labelWidth,
                labelAlign: labelAlign,
                labelLayout: labelLayout,
                pristine: pristine,
                disabled: this.isDisabled()
            };
            var children = this.rasterizedChildren();
            if (!formNode) {
                children = React.createElement(
                    'form',
                    _extends({}, this.getMergedProps(), { noValidate: true }),
                    children
                );
            }
            // header按照现在的实现方法，不属于Form的子元素
            // 如果把header放在Form内，样式不好处理
            return React.createElement(
                FormContext.Provider,
                { value: value },
                children
            );
        }
    }, {
        key: 'handleSubmit',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(e) {
                var _props2, target, action, dataSet, method, _props2$processParams, processParams, _props2$onSuccess, onSuccess, _props2$onError, onError, _props2$onSubmit, onSubmit;

                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                e.preventDefault();
                                e.persist();
                                _context2.next = 4;
                                return this.checkValidity();

                            case 4:
                                if (!_context2.sent) {
                                    _context2.next = 31;
                                    break;
                                }

                                _props2 = this.props, target = _props2.target, action = _props2.action, dataSet = _props2.dataSet, method = _props2.method, _props2$processParams = _props2.processParams, processParams = _props2$processParams === undefined ? noop : _props2$processParams, _props2$onSuccess = _props2.onSuccess, onSuccess = _props2$onSuccess === undefined ? noop : _props2$onSuccess, _props2$onError = _props2.onError, onError = _props2$onError === undefined ? noop : _props2$onError, _props2$onSubmit = _props2.onSubmit, onSubmit = _props2$onSubmit === undefined ? noop : _props2$onSubmit;

                                onSubmit(e);
                                _context2.prev = 7;

                                if (!dataSet) {
                                    _context2.next = 16;
                                    break;
                                }

                                _context2.t0 = onSuccess;
                                _context2.next = 12;
                                return dataSet.submit();

                            case 12:
                                _context2.t1 = _context2.sent;
                                (0, _context2.t0)(_context2.t1);
                                _context2.next = 26;
                                break;

                            case 16:
                                if (!action) {
                                    _context2.next = 26;
                                    break;
                                }

                                if (!(target && this.element)) {
                                    _context2.next = 21;
                                    break;
                                }

                                this.element.submit();
                                _context2.next = 26;
                                break;

                            case 21:
                                _context2.t2 = onSuccess;
                                _context2.next = 24;
                                return this.axios[method || 'get'](action, processParams(e));

                            case 24:
                                _context2.t3 = _context2.sent;
                                (0, _context2.t2)(_context2.t3);

                            case 26:
                                _context2.next = 31;
                                break;

                            case 28:
                                _context2.prev = 28;
                                _context2.t4 = _context2['catch'](7);

                                onError(_context2.t4);

                            case 31:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[7, 28]]);
            }));

            function handleSubmit(_x) {
                return _ref.apply(this, arguments);
            }

            return handleSubmit;
        }()
    }, {
        key: 'handleReset',
        value: function handleReset(e) {
            var _props3 = this.props,
                dataSet = _props3.dataSet,
                _props3$onReset = _props3.onReset,
                onReset = _props3$onReset === undefined ? noop : _props3$onReset;

            onReset(e);
            if (!e.isDefaultPrevented()) {
                if (dataSet) {
                    dataSet.reset();
                } else {
                    this.getFields().forEach(function (field) {
                        return field.reset();
                    });
                }
            }
        }
    }, {
        key: 'checkValidity',
        value: function checkValidity() {
            return Promise.all(this.getFields().map(function (field) {
                return field.checkValidity();
            })).then(function (results) {
                return results.every(function (result) {
                    return result;
                });
            });
        }
    }, {
        key: 'getFields',
        value: function getFields() {
            var id = this.props.id;

            if (id) {
                return [].concat(this.fields, getFieldsById(id));
            } else {
                return this.fields;
            }
        }
    }, {
        key: 'getField',
        value: function getField(name) {
            return this.getFields().find(function (field) {
                return field.props.name === name;
            });
        }
    }, {
        key: 'addField',
        value: function addField(field) {
            this.fields.push(field);
        }
    }, {
        key: 'removeField',
        value: function removeField(field) {
            var index = this.fields.indexOf(field);
            if (index !== -1) {
                this.fields.splice(index, 1);
            }
        }
    }, {
        key: 'axios',
        get: function get() {
            return this.observableProps.axios || getConfig('axios') || axios;
        }
    }, {
        key: 'dataSet',
        get: function get() {
            return this.observableProps.dataSet;
        }
    }, {
        key: 'record',
        get: function get() {
            return this.observableProps.record;
        }
    }, {
        key: 'dataIndex',
        get: function get() {
            return this.observableProps.dataIndex;
        }
    }, {
        key: 'columns',
        get: function get() {
            var columns = this.observableProps.columns;

            if (isNumber(columns)) {
                return columns;
            } else if (columns) {
                return columns[this.responsiveKey] || defaultColumns;
            }
            return defaultColumns;
        }
    }, {
        key: 'labelWidth',
        get: function get() {
            var labelWidth = this.observableProps.labelWidth;

            if (isNumber(labelWidth) || isArrayLike(labelWidth)) {
                return labelWidth;
            } else if (labelWidth) {
                return labelWidth[this.responsiveKey] || defaultLabelWidth;
            }
            return defaultLabelWidth;
        }
    }, {
        key: 'labelAlign',
        get: function get() {
            var labelAlign = this.observableProps.labelAlign;

            var defaultLabelAlign = this.labelLayout === "vertical" /* vertical */ ? "left" /* left */ : "right" /* right */;
            if (isString(labelAlign)) {
                return labelAlign;
            } else if (labelAlign) {
                return labelAlign[this.responsiveKey] || defaultLabelAlign;
            }
            return defaultLabelAlign;
        }
    }, {
        key: 'labelLayout',
        get: function get() {
            var defaultLabelLayout = getConfig('labelLayout') || "horizontal" /* horizontal */;
            var labelLayout = this.observableProps.labelLayout;

            if (isString(labelLayout)) {
                return labelLayout;
            } else if (labelLayout) {
                return labelLayout[this.responsiveKey] || defaultLabelLayout;
            }
            return defaultLabelLayout;
        }
    }, {
        key: 'pristine',
        get: function get() {
            return this.observableProps.pristine;
        }
    }]);

    return Form;
}(DataSetComponent);
Form.displayName = 'Form';
Form.propTypes = _extends({
    /**
     * 表单提交请求地址
     */
    action: PropTypes.string,
    /**
     * 表单提交的HTTP Method
     * 可选值：POST | GET
     * @default POST
     */
    method: PropTypes.string,
    /**
     * 表单提交的目标
     * 当表单设置了设置target且没有dataSet时作浏览器默认提交，否则作Ajax提交
     */
    target: PropTypes.string,
    /**
     * Ajax提交时的参数回调
     */
    processParams: PropTypes.func,
    /**
     * 内部控件的标签的宽度
     */
    labelWidth: PropTypes.oneOfType([labelWidthPropTypes, PropTypes.shape((_PropTypes$shape = {}, _defineProperty(_PropTypes$shape, "xs" /* xs */, labelWidthPropTypes), _defineProperty(_PropTypes$shape, "sm" /* sm */, labelWidthPropTypes), _defineProperty(_PropTypes$shape, "md" /* md */, labelWidthPropTypes), _defineProperty(_PropTypes$shape, "lg" /* lg */, labelWidthPropTypes), _defineProperty(_PropTypes$shape, "xl" /* xl */, labelWidthPropTypes), _defineProperty(_PropTypes$shape, "xxl" /* xxl */, labelWidthPropTypes), _PropTypes$shape))]),
    /**
     * 标签文字对齐方式
     * 可选值： 'left' | 'center' | 'right'
     */
    labelAlign: PropTypes.oneOfType([labelAlignPropTypes, PropTypes.shape((_PropTypes$shape2 = {}, _defineProperty(_PropTypes$shape2, "xs" /* xs */, labelAlignPropTypes), _defineProperty(_PropTypes$shape2, "sm" /* sm */, labelAlignPropTypes), _defineProperty(_PropTypes$shape2, "md" /* md */, labelAlignPropTypes), _defineProperty(_PropTypes$shape2, "lg" /* lg */, labelAlignPropTypes), _defineProperty(_PropTypes$shape2, "xl" /* xl */, labelAlignPropTypes), _defineProperty(_PropTypes$shape2, "xxl" /* xxl */, labelAlignPropTypes), _PropTypes$shape2))]),
    /**
     * 标签位置
     * 可选值： 'horizontal' | 'vertical' | 'placeholder' | 'float' | 'none'
     */
    labelLayout: PropTypes.oneOfType([labelLayoutPropTypes, PropTypes.shape((_PropTypes$shape3 = {}, _defineProperty(_PropTypes$shape3, "xs" /* xs */, labelLayoutPropTypes), _defineProperty(_PropTypes$shape3, "sm" /* sm */, labelLayoutPropTypes), _defineProperty(_PropTypes$shape3, "md" /* md */, labelLayoutPropTypes), _defineProperty(_PropTypes$shape3, "lg" /* lg */, labelLayoutPropTypes), _defineProperty(_PropTypes$shape3, "xl" /* xl */, labelLayoutPropTypes), _defineProperty(_PropTypes$shape3, "xxl" /* xxl */, labelLayoutPropTypes), _PropTypes$shape3))]),
    /**
     * 表单列数
     */
    columns: PropTypes.oneOfType([PropTypes.number, PropTypes.shape((_PropTypes$shape4 = {}, _defineProperty(_PropTypes$shape4, "xs" /* xs */, PropTypes.number), _defineProperty(_PropTypes$shape4, "sm" /* sm */, PropTypes.number), _defineProperty(_PropTypes$shape4, "md" /* md */, PropTypes.number), _defineProperty(_PropTypes$shape4, "lg" /* lg */, PropTypes.number), _defineProperty(_PropTypes$shape4, "xl" /* xl */, PropTypes.number), _defineProperty(_PropTypes$shape4, "xxl" /* xxl */, PropTypes.number), _PropTypes$shape4))]),
    /**
     * 表单头
     */
    header: PropTypes.string,
    /**
     * 提交回调
     */
    onSubmit: PropTypes.func,
    /**
     * 重置回调
     */
    onReset: PropTypes.func,
    /**
     * 提交成功回调
     */
    onSuccess: PropTypes.func,
    /**
     * 提交失败回调
     */
    onError: PropTypes.func
}, DataSetComponent.propTypes);
Form.defaultProps = {
    suffixCls: 'form',
    columns: defaultColumns,
    labelWidth: defaultLabelWidth
};
Form.contextType = FormContext;
tslib_1.__decorate([observable], Form.prototype, "responsiveKey", void 0);
tslib_1.__decorate([computed], Form.prototype, "axios", null);
tslib_1.__decorate([computed], Form.prototype, "dataSet", null);
tslib_1.__decorate([computed], Form.prototype, "record", null);
tslib_1.__decorate([computed], Form.prototype, "dataIndex", null);
tslib_1.__decorate([computed], Form.prototype, "columns", null);
tslib_1.__decorate([computed], Form.prototype, "labelWidth", null);
tslib_1.__decorate([computed], Form.prototype, "labelAlign", null);
tslib_1.__decorate([computed], Form.prototype, "labelLayout", null);
tslib_1.__decorate([computed], Form.prototype, "pristine", null);
tslib_1.__decorate([mobxAction], Form.prototype, "setResponsiveKey", null);
tslib_1.__decorate([mobxAction], Form.prototype, "initResponsive", null);
tslib_1.__decorate([autobind], Form.prototype, "handleSubmit", null);
tslib_1.__decorate([autobind], Form.prototype, "handleReset", null);
Form = tslib_1.__decorate([observer], Form);
export default Form;