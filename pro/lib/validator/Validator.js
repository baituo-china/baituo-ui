'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _Validity = require('./Validity');

var _Validity2 = _interopRequireDefault(_Validity);

var _ValidationResult = require('./ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _valueMissing = require('./rules/valueMissing');

var _valueMissing2 = _interopRequireDefault(_valueMissing);

var _getReactNodeText = require('../_util/getReactNodeText');

var _getReactNodeText2 = _interopRequireDefault(_getReactNodeText);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import isEqual from 'lodash/isEqual';
var Validator = function () {
    function Validator() {
        var _this = this;

        (0, _classCallCheck3['default'])(this, Validator);

        this.validity = new _Validity2['default']();
        this.injectionOptions = {};
        this.validationMessage = '';
        (0, _mobx.runInAction)(function () {
            _this.validationErrorValues = [];
        });
    }

    (0, _createClass3['default'])(Validator, [{
        key: 'setProps',
        value: function setProps(props) {
            this.fieldProps = props;
        }
    }, {
        key: 'setControlProps',
        value: function setControlProps(props) {
            this.controlProps = props;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.validedValue = void 0;
            this.validationMessage = '';
            this.validity.reset();
        }
    }, {
        key: 'report',
        value: function () {
            var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(ret) {
                var ruleName, validationMessage, injectionOptions, _console, _props, name, dataSet, record, _validationMessage, reportMessage, dsName, id;

                return _regenerator2['default'].wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (ret instanceof _ValidationResult2['default']) {
                                    ruleName = ret.ruleName, validationMessage = ret.validationMessage, injectionOptions = ret.injectionOptions;

                                    this.validity[ruleName] = true;
                                    this.validationMessage = validationMessage;
                                    this.injectionOptions = injectionOptions || {};
                                }

                                if (!(process.env.NODE_ENV !== 'production' && !this.validity.valid && typeof console !== 'undefined')) {
                                    _context.next = 17;
                                    break;
                                }

                                _props = this.props, name = _props.name, dataSet = _props.dataSet, record = _props.record;
                                _validationMessage = this.validationMessage;

                                if (!(0, _isString2['default'])(_validationMessage)) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.t0 = _validationMessage;
                                _context.next = 11;
                                break;

                            case 8:
                                _context.next = 10;
                                return (0, _getReactNodeText2['default'])(_react2['default'].createElement(
                                    'span',
                                    null,
                                    _validationMessage
                                ));

                            case 10:
                                _context.t0 = _context.sent;

                            case 11:
                                _context.t1 = _context.t0;
                                reportMessage = ['validation:', _context.t1];

                                if (dataSet) {
                                    dsName = dataSet.name, id = dataSet.id;

                                    if (dsName || id) {
                                        reportMessage.push('\n[dataSet<' + (dsName || id) + '>]:', dataSet);
                                    } else {
                                        reportMessage.push('\n[dataSet]:', dataSet);
                                    }
                                }
                                if (record) {
                                    if (dataSet) {
                                        reportMessage.push('\n[record<' + dataSet.indexOf(record) + '>]:', record);
                                    } else {
                                        reportMessage.push('\n[record]:', record);
                                    }
                                    reportMessage.push('\n[field<' + name + '>]:', record.getField(name));
                                } else {
                                    reportMessage.push('[field]:', name);
                                }
                                reportMessage.push('\n[value]:', this.validedValue);
                                (_console = console).warn.apply(_console, reportMessage);

                            case 17:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function report(_x) {
                return _ref.apply(this, arguments);
            }

            return report;
        }()
    }, {
        key: 'clearErrors',
        value: function clearErrors() {
            this.validationErrorValues = [];
        }
    }, {
        key: 'addError',
        value: function addError(result) {
            this.validationErrorValues.push(result);
        }
    }, {
        key: 'checkValidity',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee3() {
                var _this2 = this;

                var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var useCachedResult;
                return _regenerator2['default'].wrap(function _callee3$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                // const useCache = isEqual(this.validedValue, value);
                                useCachedResult = false;

                                if (useCachedResult) {
                                    _context4.next = 3;
                                    break;
                                }

                                return _context4.delegateYield( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
                                    var props, valueMiss, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, method, _ret2;

                                    return _regenerator2['default'].wrap(function _callee2$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    props = _this2.props;

                                                    _this2.validedValue = value;
                                                    valueMiss = (0, _valueMissing2['default'])(value, props);

                                                    _this2.clearErrors();

                                                    if (!(valueMiss !== true)) {
                                                        _context3.next = 8;
                                                        break;
                                                    }

                                                    _this2.report(valueMiss);
                                                    _context3.next = 38;
                                                    break;

                                                case 8:
                                                    if ((0, _mobx.isArrayLike)(value)) {
                                                        value = value.slice();
                                                    } else {
                                                        value = [value];
                                                    }
                                                    _loop = /*#__PURE__*/_regenerator2['default'].mark(function _loop(method) {
                                                        var results, ret;
                                                        return _regenerator2['default'].wrap(function _loop$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        _context2.next = 2;
                                                                        return Promise.all(value.map(function (item) {
                                                                            return method(item, props);
                                                                        }));

                                                                    case 2:
                                                                        results = _context2.sent;
                                                                        ret = true;

                                                                        results.forEach(function (result) {
                                                                            if (result instanceof _ValidationResult2['default']) {
                                                                                ret = result;
                                                                                _this2.addError(result);
                                                                                var index = value.indexOf(result.value);
                                                                                if (index !== -1) {
                                                                                    value.splice(index, 1);
                                                                                }
                                                                            }
                                                                        });
                                                                        if (ret !== true) {
                                                                            _this2.report(ret);
                                                                        }

                                                                        if (value.length) {
                                                                            _context2.next = 8;
                                                                            break;
                                                                        }

                                                                        return _context2.abrupt('return', 'break');

                                                                    case 8:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _loop, _this2);
                                                    });
                                                    _iteratorNormalCompletion = true;
                                                    _didIteratorError = false;
                                                    _iteratorError = undefined;
                                                    _context3.prev = 13;
                                                    _iterator = _rules2['default'][Symbol.iterator]();

                                                case 15:
                                                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                        _context3.next = 24;
                                                        break;
                                                    }

                                                    method = _step.value;
                                                    return _context3.delegateYield(_loop(method), 't0', 18);

                                                case 18:
                                                    _ret2 = _context3.t0;

                                                    if (!(_ret2 === 'break')) {
                                                        _context3.next = 21;
                                                        break;
                                                    }

                                                    return _context3.abrupt('break', 24);

                                                case 21:
                                                    _iteratorNormalCompletion = true;
                                                    _context3.next = 15;
                                                    break;

                                                case 24:
                                                    _context3.next = 30;
                                                    break;

                                                case 26:
                                                    _context3.prev = 26;
                                                    _context3.t1 = _context3['catch'](13);
                                                    _didIteratorError = true;
                                                    _iteratorError = _context3.t1;

                                                case 30:
                                                    _context3.prev = 30;
                                                    _context3.prev = 31;

                                                    if (!_iteratorNormalCompletion && _iterator['return']) {
                                                        _iterator['return']();
                                                    }

                                                case 33:
                                                    _context3.prev = 33;

                                                    if (!_didIteratorError) {
                                                        _context3.next = 36;
                                                        break;
                                                    }

                                                    throw _iteratorError;

                                                case 36:
                                                    return _context3.finish(33);

                                                case 37:
                                                    return _context3.finish(30);

                                                case 38:
                                                case 'end':
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee2, _this2, [[13, 26, 30, 38], [31,, 33, 37]]);
                                })(), 't0', 3);

                            case 3:
                                return _context4.abrupt('return', this.validity.valid);

                            case 4:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function checkValidity() {
                return _ref2.apply(this, arguments);
            }

            return checkValidity;
        }()
    }, {
        key: 'props',
        get: function get() {
            return (0, _extends3['default'])({}, this.fieldProps, this.controlProps);
        }
    }]);
    return Validator;
}();

exports['default'] = Validator;

tslib_1.__decorate([_mobx.observable], Validator.prototype, "fieldProps", void 0);
tslib_1.__decorate([_mobx.observable], Validator.prototype, "controlProps", void 0);
tslib_1.__decorate([_mobx.observable], Validator.prototype, "validationErrorValues", void 0);
tslib_1.__decorate([_mobx.computed], Validator.prototype, "props", null);
tslib_1.__decorate([_mobx.action], Validator.prototype, "setProps", null);
tslib_1.__decorate([_mobx.action], Validator.prototype, "setControlProps", null);
tslib_1.__decorate([_mobx.action], Validator.prototype, "report", null);
tslib_1.__decorate([_mobx.action], Validator.prototype, "clearErrors", null);
tslib_1.__decorate([_mobx.action], Validator.prototype, "addError", null);
module.exports = exports['default'];