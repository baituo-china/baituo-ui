'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _TextField2 = require('../text-field/TextField');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _ModalContainer = require('../modal-container/ModalContainer');

var _IntlList = require('./IntlList');

var _IntlList2 = _interopRequireDefault(_IntlList);

var _DataSet = require('../data-set/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _EventManager = require('../_util/EventManager');

var _progress = require('../progress');

var _progress2 = _interopRequireDefault(_progress);

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IntlField = function (_TextField) {
    (0, _inherits3['default'])(IntlField, _TextField);

    function IntlField() {
        var _this2 = this;

        (0, _classCallCheck3['default'])(this, IntlField);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (IntlField.__proto__ || Object.getPrototypeOf(IntlField)).apply(this, arguments));

        _this.openModal = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
            var modalProps, record, lang, name, value, current;
            return _regenerator2['default'].wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (_this.modal) {
                                _context.next = 16;
                                break;
                            }

                            modalProps = _this.props.modalProps;
                            record = _this.record, lang = _this.lang, name = _this.name;

                            if (!record) {
                                _context.next = 12;
                                break;
                            }

                            (0, _mobx.runInAction)(function () {
                                _this.loading = true;
                            });
                            _context.prev = 5;
                            _context.next = 8;
                            return record.tls(name);

                        case 8:
                            _context.prev = 8;

                            (0, _mobx.runInAction)(function () {
                                _this.loading = false;
                            });
                            return _context.finish(8);

                        case 11:
                            if (record.tlsDataSet) {
                                _this.tlsDataSet = record.tlsDataSet;
                            }

                        case 12:
                            if (!_this.tlsDataSet) {
                                value = (0, _defineProperty3['default'])({}, lang, _this.getValue());

                                _this.tlsDataSet = new _DataSet2['default']({
                                    data: [name ? (0, _defineProperty3['default'])({}, name, value) : value]
                                });
                            }
                            current = _this.tlsDataSet.current;

                            if (current) {
                                _this.storeLocales(current.data);
                            } else {
                                _this.tlsDataSet.addEventListener('load', _this.handleTlsLoad);
                            }
                            _this.modal = (0, _ModalContainer.open)((0, _extends3['default'])({
                                title: (0, _localeContext.$l)('IntlField', 'modal_title'),
                                children: _react2['default'].createElement(_IntlList2['default'], { dataSet: _this.tlsDataSet, name: name, lang: lang }),
                                onClose: _this.handleIntlListClose,
                                onOk: _this.handleIntlListOk,
                                onCancel: _this.handleIntlListCancel,
                                destroyOnClose: true
                            }, modalProps));

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[5,, 8, 11]]);
        }));
        _this.handleIntlListClose = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
            return _regenerator2['default'].wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            delete _this.modal;
                            _this.focus();

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));
        _this.handleIntlListOk = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee3() {
            var tlsDataSet, current, lang, name;
            return _regenerator2['default'].wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            tlsDataSet = _this.tlsDataSet;
                            current = tlsDataSet.current;

                            if (!current) {
                                _context3.next = 11;
                                break;
                            }

                            _context3.next = 5;
                            return current.validate(true);

                        case 5:
                            if (_context3.sent) {
                                _context3.next = 9;
                                break;
                            }

                            return _context3.abrupt('return', false);

                        case 9:
                            lang = _this.lang, name = _this.name;

                            _this.setValue(current.get(name ? name + '.' + lang : lang));

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));
        _this.handleIntlListCancel = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee4() {
            var locales, name, current;
            return _regenerator2['default'].wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            locales = _this.locales, name = _this.name, current = _this.tlsDataSet.current;

                            if (current && locales) {
                                Object.keys(locales).forEach(function (key) {
                                    return current.set(name ? name + '.' + key : key, locales[key]);
                                });
                            }

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        }));
        _this.handleTlsLoad = function () {
            var current = _this.tlsDataSet.current;

            if (current) {
                _this.storeLocales(current.data);
            }
        };
        return _this;
    }

    (0, _createClass3['default'])(IntlField, [{
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (e.keyCode === _KeyCode2['default'].DOWN) {
                (0, _EventManager.stopEvent)(e);
                this.openModal();
            }
            (0, _get3['default'])(IntlField.prototype.__proto__ || Object.getPrototypeOf(IntlField.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (this.modal) {
                e.preventDefault();
            }
            (0, _get3['default'])(IntlField.prototype.__proto__ || Object.getPrototypeOf(IntlField.prototype), 'handleBlur', this).call(this, e);
        }
    }, {
        key: 'storeLocales',
        value: function storeLocales(data) {
            var name = this.name;

            this.locales = (0, _cloneDeep2['default'])(name ? data[name] : data);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            (0, _get3['default'])(IntlField.prototype.__proto__ || Object.getPrototypeOf(IntlField.prototype), 'setValue', this).call(this, value);
            if (this.tlsDataSet && !this.record) {
                var current = this.tlsDataSet.current;
                var lang = this.lang,
                    name = this.name;

                if (current) {
                    current.set(name ? name + '.' + lang : lang, this.value);
                }
            }
        }
    }, {
        key: 'getSuffix',
        value: function getSuffix() {
            var suffix = this.props.suffix;

            return this.wrapperSuffix(this.loading ? _react2['default'].createElement(_progress2['default'], { size: "small" /* small */, type: "loading" /* loading */ }) : suffix || _react2['default'].createElement(_icon2['default'], { type: 'language' }), {
                onClick: this.isDisabled() || this.isReadOnly() ? void 0 : this.openModal
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.modal) {
                this.modal.close();
            }
            if (this.tlsDataSet) {
                this.tlsDataSet.removeEventListener("load" /* load */, this.handleTlsLoad);
            }
        }
    }]);
    return IntlField;
}(_TextField2.TextField);
IntlField.displayName = 'IntlField';
tslib_1.__decorate([_mobx.observable], IntlField.prototype, "loading", void 0);
tslib_1.__decorate([_autobind2['default']], IntlField.prototype, "handleKeyDown", null);
tslib_1.__decorate([_autobind2['default']], IntlField.prototype, "handleBlur", null);
IntlField = tslib_1.__decorate([_mobxReact.observer], IntlField);
exports['default'] = IntlField;
module.exports = exports['default'];