'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _PropTypes$shape, _PropTypes$shape2, _PropTypes$shape3, _PropTypes$shape4;

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _defaultTo = require('lodash/defaultTo');

var _defaultTo2 = _interopRequireDefault(_defaultTo);

var _configure = require('../../../lib/configure');

var _axios = require('../axios');

var _axios2 = _interopRequireDefault(_axios);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _FormField = require('../field/FormField');

var _FormContext = require('./FormContext');

var _FormContext2 = _interopRequireDefault(_FormContext);

var _DataSetComponent2 = require('../data-set/DataSetComponent');

var _DataSetComponent3 = _interopRequireDefault(_DataSetComponent2);

var _utils = require('./utils');

var _exception = require('../_util/exception');

var _exception2 = _interopRequireDefault(_exception);

var _EventManager = require('../_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * 表单name生成器
 */
var NameGen = /*#__PURE__*/_regenerator2['default'].mark(function _callee(start) {
    return _regenerator2['default'].wrap(function _callee$(_context) {
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
var labelWidthPropTypes = _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].arrayOf(_propTypes2['default'].number)]);
var labelAlignPropTypes = _propTypes2['default'].oneOf(["left" /* left */, "center" /* center */, "right" /* right */]);
var labelLayoutPropTypes = _propTypes2['default'].oneOf(["horizontal" /* horizontal */, "vertical" /* vertical */, "placeholder" /* placeholder */, "float" /* float */]);
var Form = function (_DataSetComponent) {
    (0, _inherits3['default'])(Form, _DataSetComponent);

    function Form(props, context) {
        (0, _classCallCheck3['default'])(this, Form);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props, context));

        _this.fields = [];
        _this.resizeEvent = new _EventManager2['default'](typeof window !== 'undefined' && window);
        _this.name = NameGen.next().value;
        _this.handleResize = function () {
            _this.setResponsiveKey();
        };
        _this.setResponsiveKey();
        _this.initResponsive();
        return _this;
    }

    (0, _createClass3['default'])(Form, [{
        key: 'isDisabled',
        value: function isDisabled() {
            return (0, _get3['default'])(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'isDisabled', this).call(this) || this.context.disabled;
        }
    }, {
        key: 'getObservableProps',
        value: function getObservableProps(props, context) {
            return {
                dataSet: 'dataSet' in props ? props.dataSet : context.dataSet,
                record: 'record' in props ? props.record : context.record,
                dataIndex: (0, _defaultTo2['default'])(props.dataIndex, context.dataIndex),
                labelLayout: 'labelLayout' in props ? props.labelLayout : context.labelLayout,
                labelAlign: 'labelAlign' in props ? props.labelAlign : context.labelAlign,
                labelWidth: (0, _defaultTo2['default'])(props.labelWidth, context.labelWidth),
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
            (0, _get3['default'])(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'componentWillReceiveProps', this).call(this, props, context);
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
                        (0, _exception2['default'])(e);
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
            if (!(0, _isNumber2['default'])(columns) || !((0, _isNumber2['default'])(labelWidth) || (0, _mobx.isArrayLike)(labelWidth)) || !(0, _isString2['default'])(labelLayout) || labelAlign && !(0, _isString2['default'])(labelAlign)) {
                this.resizeEvent.addEventListener('resize', this.handleResize);
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            var otherProps = (0, _omit2['default'])((0, _get3['default'])(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'getOtherProps', this).call(this), ['record', 'dataIndex', 'onSuccess', 'onError', 'processParams', 'labelWidth', 'labelAlign', 'labelLayout', 'columns', 'axios']);
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
                return _react2['default'].createElement(
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

            return (0, _get3['default'])(Form.prototype.__proto__ || Object.getPrototypeOf(Form.prototype), 'getClassName', this).call(this, (0, _extends4['default'])({}, props, (0, _defineProperty3['default'])({}, prefixCls + '-float-label', labelLayout === "float")));
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

            var prefixCls = (0, _configure.getProPrefixCls)(_utils.FIELD_SUFFIX);
            var labelWidth = (0, _utils.normalizeLabelWidth)(this.labelWidth, columns);
            var rows = [];
            var cols = [];
            var rowIndex = 0;
            var colIndex = 0;
            var matrix = [[]];
            var noLabel = true;
            var childrenArray = [];
            _react.Children.forEach(children, function (child) {
                if ((0, _react.isValidElement)(child)) {
                    if (noLabel === true && labelLayout === "horizontal" /* horizontal */ && (0, _utils.getProperty)(child.props, 'label', dataSet, record)) {
                        noLabel = false;
                    }
                    childrenArray.push(child);
                }
            });
            function completeLine() {
                if (cols.length) {
                    rows.push(_react2['default'].createElement(
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

                var label = (0, _utils.getProperty)(_props, 'label', dataSet, record);
                var required = (0, _utils.getProperty)(_props, 'required', dataSet, record);
                var _props$rowSpan = _props.rowSpan,
                    rowSpan = _props$rowSpan === undefined ? 1 : _props$rowSpan,
                    _props$colSpan = _props.colSpan,
                    colSpan = _props$colSpan === undefined ? 1 : _props$colSpan,
                    newLine = _props.newLine,
                    otherProps = (0, _objectWithoutProperties3['default'])(_props, ['rowSpan', 'colSpan', 'newLine']);

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
                var labelClassName = (0, _classnames2['default'])(prefixCls + '-label', prefixCls + '-label-' + labelAlign, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-required', required), (0, _defineProperty3['default'])(_classNames, prefixCls + '-label-vertical', labelLayout === "vertical"), _classNames));
                var wrapperClassName = prefixCls + '-wrapper';
                if (!noLabel) {
                    cols.push(_react2['default'].createElement(
                        'td',
                        { key: 'row-' + rowIndex + '-col-' + colIndex + '-label', className: labelClassName, rowSpan: rowSpan },
                        _react2['default'].createElement(
                            'label',
                            null,
                            label
                        )
                    ));
                }
                var fieldElementProps = (0, _extends4['default'])({
                    key: key,
                    className: prefixCls,
                    placeholder: labelLayout === "placeholder" /* placeholder */ ? label : void 0
                }, otherProps);
                if (!(0, _isString2['default'])(type)) {
                    fieldElementProps.rowIndex = rowIndex;
                    fieldElementProps.colIndex = colIndex;
                }
                cols.push(_react2['default'].createElement(
                    'td',
                    { key: 'row-' + rowIndex + '-col-' + colIndex + '-field', colSpan: noLabel ? colSpan : colSpan * 2 - 1, rowSpan: rowSpan },
                    labelLayout === "vertical" /* vertical */ && _react2['default'].createElement(
                        'label',
                        { className: labelClassName },
                        label
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: wrapperClassName },
                        (0, _react.createElement)(type, fieldElementProps)
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
                    cols.push(_react2['default'].createElement('col', { key: 'label-' + _i2, style: { width: labelWidth[_i2 % columns] } }), _react2['default'].createElement('col', { key: 'wrapper-' + _i2 }));
                }
            }
            return [this.getHeader(), _react2['default'].createElement(
                'table',
                { key: 'form-body' },
                cols.length ? _react2['default'].createElement(
                    'colgroup',
                    null,
                    cols
                ) : void 0,
                _react2['default'].createElement(
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
                children = _react2['default'].createElement(
                    'form',
                    (0, _extends4['default'])({}, this.getMergedProps(), { noValidate: true }),
                    children
                );
            }
            // header按照现在的实现方法，不属于Form的子元素
            // 如果把header放在Form内，样式不好处理
            return _react2['default'].createElement(
                _FormContext2['default'].Provider,
                { value: value },
                children
            );
        }
    }, {
        key: 'handleSubmit',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2(e) {
                var _props2, target, action, dataSet, method, _props2$processParams, processParams, _props2$onSuccess, onSuccess, _props2$onError, onError, _props2$onSubmit, onSubmit;

                return _regenerator2['default'].wrap(function _callee2$(_context2) {
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

                                _props2 = this.props, target = _props2.target, action = _props2.action, dataSet = _props2.dataSet, method = _props2.method, _props2$processParams = _props2.processParams, processParams = _props2$processParams === undefined ? _noop2['default'] : _props2$processParams, _props2$onSuccess = _props2.onSuccess, onSuccess = _props2$onSuccess === undefined ? _noop2['default'] : _props2$onSuccess, _props2$onError = _props2.onError, onError = _props2$onError === undefined ? _noop2['default'] : _props2$onError, _props2$onSubmit = _props2.onSubmit, onSubmit = _props2$onSubmit === undefined ? _noop2['default'] : _props2$onSubmit;

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
                onReset = _props3$onReset === undefined ? _noop2['default'] : _props3$onReset;

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
                return [].concat(this.fields, (0, _FormField.getFieldsById)(id));
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
            return this.observableProps.axios || (0, _configure.getConfig)('axios') || _axios2['default'];
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

            if ((0, _isNumber2['default'])(columns)) {
                return columns;
            } else if (columns) {
                return columns[this.responsiveKey] || _utils.defaultColumns;
            }
            return _utils.defaultColumns;
        }
    }, {
        key: 'labelWidth',
        get: function get() {
            var labelWidth = this.observableProps.labelWidth;

            if ((0, _isNumber2['default'])(labelWidth) || (0, _mobx.isArrayLike)(labelWidth)) {
                return labelWidth;
            } else if (labelWidth) {
                return labelWidth[this.responsiveKey] || _utils.defaultLabelWidth;
            }
            return _utils.defaultLabelWidth;
        }
    }, {
        key: 'labelAlign',
        get: function get() {
            var labelAlign = this.observableProps.labelAlign;

            var defaultLabelAlign = this.labelLayout === "vertical" /* vertical */ ? "left" /* left */ : "right" /* right */;
            if ((0, _isString2['default'])(labelAlign)) {
                return labelAlign;
            } else if (labelAlign) {
                return labelAlign[this.responsiveKey] || defaultLabelAlign;
            }
            return defaultLabelAlign;
        }
    }, {
        key: 'labelLayout',
        get: function get() {
            var defaultLabelLayout = (0, _configure.getConfig)('labelLayout') || "horizontal" /* horizontal */;
            var labelLayout = this.observableProps.labelLayout;

            if ((0, _isString2['default'])(labelLayout)) {
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
}(_DataSetComponent3['default']);
Form.displayName = 'Form';
Form.propTypes = (0, _extends4['default'])({
    /**
     * 表单提交请求地址
     */
    action: _propTypes2['default'].string,
    /**
     * 表单提交的HTTP Method
     * 可选值：POST | GET
     * @default POST
     */
    method: _propTypes2['default'].string,
    /**
     * 表单提交的目标
     * 当表单设置了设置target且没有dataSet时作浏览器默认提交，否则作Ajax提交
     */
    target: _propTypes2['default'].string,
    /**
     * Ajax提交时的参数回调
     */
    processParams: _propTypes2['default'].func,
    /**
     * 内部控件的标签的宽度
     */
    labelWidth: _propTypes2['default'].oneOfType([labelWidthPropTypes, _propTypes2['default'].shape((_PropTypes$shape = {}, (0, _defineProperty3['default'])(_PropTypes$shape, "xs" /* xs */, labelWidthPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape, "sm" /* sm */, labelWidthPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape, "md" /* md */, labelWidthPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape, "lg" /* lg */, labelWidthPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape, "xl" /* xl */, labelWidthPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape, "xxl" /* xxl */, labelWidthPropTypes), _PropTypes$shape))]),
    /**
     * 标签文字对齐方式
     * 可选值： 'left' | 'center' | 'right'
     */
    labelAlign: _propTypes2['default'].oneOfType([labelAlignPropTypes, _propTypes2['default'].shape((_PropTypes$shape2 = {}, (0, _defineProperty3['default'])(_PropTypes$shape2, "xs" /* xs */, labelAlignPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape2, "sm" /* sm */, labelAlignPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape2, "md" /* md */, labelAlignPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape2, "lg" /* lg */, labelAlignPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape2, "xl" /* xl */, labelAlignPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape2, "xxl" /* xxl */, labelAlignPropTypes), _PropTypes$shape2))]),
    /**
     * 标签位置
     * 可选值： 'horizontal' | 'vertical' | 'placeholder' | 'float' | 'none'
     */
    labelLayout: _propTypes2['default'].oneOfType([labelLayoutPropTypes, _propTypes2['default'].shape((_PropTypes$shape3 = {}, (0, _defineProperty3['default'])(_PropTypes$shape3, "xs" /* xs */, labelLayoutPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape3, "sm" /* sm */, labelLayoutPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape3, "md" /* md */, labelLayoutPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape3, "lg" /* lg */, labelLayoutPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape3, "xl" /* xl */, labelLayoutPropTypes), (0, _defineProperty3['default'])(_PropTypes$shape3, "xxl" /* xxl */, labelLayoutPropTypes), _PropTypes$shape3))]),
    /**
     * 表单列数
     */
    columns: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].shape((_PropTypes$shape4 = {}, (0, _defineProperty3['default'])(_PropTypes$shape4, "xs" /* xs */, _propTypes2['default'].number), (0, _defineProperty3['default'])(_PropTypes$shape4, "sm" /* sm */, _propTypes2['default'].number), (0, _defineProperty3['default'])(_PropTypes$shape4, "md" /* md */, _propTypes2['default'].number), (0, _defineProperty3['default'])(_PropTypes$shape4, "lg" /* lg */, _propTypes2['default'].number), (0, _defineProperty3['default'])(_PropTypes$shape4, "xl" /* xl */, _propTypes2['default'].number), (0, _defineProperty3['default'])(_PropTypes$shape4, "xxl" /* xxl */, _propTypes2['default'].number), _PropTypes$shape4))]),
    /**
     * 表单头
     */
    header: _propTypes2['default'].string,
    /**
     * 提交回调
     */
    onSubmit: _propTypes2['default'].func,
    /**
     * 重置回调
     */
    onReset: _propTypes2['default'].func,
    /**
     * 提交成功回调
     */
    onSuccess: _propTypes2['default'].func,
    /**
     * 提交失败回调
     */
    onError: _propTypes2['default'].func
}, _DataSetComponent3['default'].propTypes);
Form.defaultProps = {
    suffixCls: 'form',
    columns: _utils.defaultColumns,
    labelWidth: _utils.defaultLabelWidth
};
Form.contextType = _FormContext2['default'];
tslib_1.__decorate([_mobx.observable], Form.prototype, "responsiveKey", void 0);
tslib_1.__decorate([_mobx.computed], Form.prototype, "axios", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "dataSet", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "record", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "dataIndex", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "columns", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "labelWidth", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "labelAlign", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "labelLayout", null);
tslib_1.__decorate([_mobx.computed], Form.prototype, "pristine", null);
tslib_1.__decorate([_mobx.action], Form.prototype, "setResponsiveKey", null);
tslib_1.__decorate([_mobx.action], Form.prototype, "initResponsive", null);
tslib_1.__decorate([_autobind2['default']], Form.prototype, "handleSubmit", null);
tslib_1.__decorate([_autobind2['default']], Form.prototype, "handleReset", null);
Form = tslib_1.__decorate([_mobxReact.observer], Form);
exports['default'] = Form;
module.exports = exports['default'];