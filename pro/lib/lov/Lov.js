'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _mobx = require('mobx');

var _UnitConvertor = require('../../../lib/_util/UnitConvertor');

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _ModalContainer = require('../modal-container/ModalContainer');

var _LovView = require('./LovView');

var _LovView2 = _interopRequireDefault(_LovView);

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _LovCodeStore = require('../stores/LovCodeStore');

var _LovCodeStore2 = _interopRequireDefault(_LovCodeStore);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _EventManager = require('../_util/EventManager');

var _Select2 = require('../select/Select');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Lov = function (_Select) {
    (0, _inherits3['default'])(Lov, _Select);

    function Lov() {
        var _this2 = this;

        (0, _classCallCheck3['default'])(this, Lov);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Lov.__proto__ || Object.getPrototypeOf(Lov)).apply(this, arguments));

        _this.openModal = (0, _mobx.action)(function () {
            var config = _this.getConfig();
            var options = _this.options;
            var _this$props = _this.props,
                modalProps = _this$props.modalProps,
                noCache = _this$props.noCache;

            if (!_this.modal && config && options) {
                var width = config.width,
                    title = config.title;

                options.unSelectAll();
                options.clearCachedSelected();
                _this.modal = (0, _ModalContainer.open)((0, _extends3['default'])({
                    title: title,
                    children: _react2['default'].createElement(_LovView2['default'], { dataSet: options, config: config, onDoubleClick: _this.handleLovViewSelect, onEnterDown: _this.handleLovViewSelect, multiple: _this.multiple, values: _this.getValues() }),
                    onClose: _this.handleLovViewClose,
                    onOk: _this.handleLovViewOk,
                    destroyOnClose: true,
                    style: (0, _extends3['default'])({
                        width: (0, _UnitConvertor.pxToRem)(width),
                        minHeight: (0, _UnitConvertor.pxToRem)(400)
                    }, modalProps && modalProps.style)
                }, (0, _omit2['default'])(modalProps, ['style'])));
                if (_this.resetOptions() || noCache) {
                    options.query();
                }
            }
        });
        _this.setFilterText = (0, _debounce2['default'])((0, _mobx.action)(function (text) {
            var options = _this.options,
                textField = _this.textField;

            _this.filterText = text;
            _this.resetOptions();
            options.setQueryParameter(textField, text);
            if (text) {
                options.query();
            }
        }), 500);
        _this.handleLovViewSelect = function () {
            _this.modal.close();
            _this.handleLovViewOk();
        };
        _this.handleLovViewClose = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
            return _regenerator2['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            delete _this.modal;
                            _this.focus();

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handleLovViewOk = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
            var options, multiple, records, values;
            return _regenerator2['default'].wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            options = _this.options, multiple = _this.multiple;
                            records = multiple ? options.selected : new Array().concat(options.current || []);
                            values = records.map(function (record) {
                                return _this.processRecordToObject(record);
                            });

                            _this.setValue(multiple ? values : values[0] || null);

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));
        return _this;
    }

    (0, _createClass3['default'])(Lov, [{
        key: 'resetOptions',
        value: function resetOptions() {
            var field = this.field,
                record = this.record,
                options = this.options;
            var queryDataSet = options.queryDataSet;

            if (queryDataSet) {
                queryDataSet.reset();
            }
            if (field) {
                var lovPara = (0, _mobx.toJS)(field.get('lovPara')) || {};
                var cascadeMap = field.get('cascadeMap');
                if (cascadeMap && record) {
                    Object.keys(cascadeMap).forEach(function (cascade) {
                        return lovPara[cascade] = record.get(cascadeMap[cascade]);
                    });
                }
                if (!(0, _isEqual2['default'])(lovPara, options.queryParameter)) {
                    options.queryParameter = lovPara;
                    return true;
                } else {
                    options.first();
                }
                if (!options.length || options.isFilteredByQueryFields) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            (0, _get3['default'])(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'setText', this).call(this, text);
            if (this.editable) {
                this.setFilterText(text);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (!this.popup && e.keyCode === _KeyCode2['default'].DOWN) {
                (0, _EventManager.stopEvent)(e);
                this.openModal();
            }
            (0, _get3['default'])(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (this.modal) {
                e.preventDefault();
            }
            (0, _get3['default'])(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'handleBlur', this).call(this, e);
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            var lovCode = this.lovCode;

            if (lovCode) {
                return _LovCodeStore2['default'].getConfig(lovCode);
            }
        }
    }, {
        key: 'getPlaceholder',
        value: function getPlaceholder() {
            var placeholder = (0, _get3['default'])(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'getPlaceholder', this).call(this);
            if (placeholder) {
                return placeholder;
            }
            var config = this.getConfig();
            if (config) {
                return config.placeholder;
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'getOtherProps', this).call(this), ['modalProps', 'noCache']);
        }
    }, {
        key: 'getSuffix',
        value: function getSuffix() {
            var suffix = this.props.suffix;

            return this.wrapperSuffix(suffix || _react2['default'].createElement(_icon2['default'], { type: 'search' }), {
                onClick: this.isDisabled() || this.isReadOnly() ? void 0 : this.openModal
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setFilterText.cancel();
            if (this.modal) {
                this.modal.close();
            }
        }
    }, {
        key: 'searchable',
        get: function get() {
            var config = this.getConfig();
            if (config) {
                return config.editableFlag === 'Y';
            }
            return !!this.props.searchable;
        }
    }, {
        key: 'lovCode',
        get: function get() {
            var field = this.field;

            if (field) {
                return field.get('lovCode');
            }
        }
    }, {
        key: 'popup',
        get: function get() {
            return !this.filterText || this.modal ? false : this.statePopup;
        }
    }, {
        key: 'options',
        get: function get() {
            var lovCode = this.lovCode;

            if (lovCode) {
                var ds = _LovCodeStore2['default'].getLovDataSet(lovCode);
                if (ds) {
                    return ds;
                }
            }
            return new _DataSet2['default']();
        }
    }]);
    return Lov;
}(_Select2.Select);
Lov.displayName = 'Lov';
Lov.propTypes = (0, _extends3['default'])({}, _Select2.Select.propTypes, {
    modalProps: _propTypes2['default'].object,
    noCache: _propTypes2['default'].bool
});
Lov.defaultProps = (0, _extends3['default'])({}, _Select2.Select.defaultProps, {
    clearButton: true,
    checkValueOnOptionsChange: false
});
tslib_1.__decorate([_mobx.observable], Lov.prototype, "filterText", void 0);
tslib_1.__decorate([_mobx.computed], Lov.prototype, "searchable", null);
tslib_1.__decorate([_mobx.computed], Lov.prototype, "lovCode", null);
tslib_1.__decorate([_mobx.computed], Lov.prototype, "popup", null);
tslib_1.__decorate([_mobx.computed], Lov.prototype, "options", null);
tslib_1.__decorate([_autobind2['default']], Lov.prototype, "handleKeyDown", null);
tslib_1.__decorate([_autobind2['default']], Lov.prototype, "handleBlur", null);
Lov = tslib_1.__decorate([_mobxReact.observer], Lov);
exports['default'] = Lov;
module.exports = exports['default'];