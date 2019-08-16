'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _mobx = require('mobx');

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

var _isEmpty = require('../../_util/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _utils = require('../../data-set/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var reportOtherField = (0, _mobx.action)(function (_ref, invalid) {
    var validator = _ref.validator,
        validity = _ref.validator.validity;

    if (invalid) {
        if (validity.valid) {
            validator.validationMessage = (0, _localeContext.$l)('Validator', 'unique');
        }
        validity.uniqueError = true;
    } else {
        validity.uniqueError = false;
        if (validity.valid) {
            validator.validationMessage = '';
        }
    }
});

exports['default'] = function () {
    var _ref3 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(value, _ref2) {
        var dataSet = _ref2.dataSet,
            record = _ref2.record,
            unique = _ref2.unique,
            name = _ref2.name;

        var fields, otherFields, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref4, _ref5, fieldName, field, otherValue, invalid, totalPage, axios, _dataSet$transport, _dataSet$transport$va, validate, adapter, newConfig, adapterConfig, results;

        return _regenerator2['default'].wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(!(0, _isEmpty2['default'])(value) && record && dataSet && unique)) {
                            _context.next = 51;
                            break;
                        }

                        fields = (0, _defineProperty3['default'])({}, name, value);
                        otherFields = [];

                        if (!(0, _isString2['default'])(unique)) {
                            _context.next = 38;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;
                        _iterator = record.fields.entries()[Symbol.iterator]();

                    case 9:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 24;
                            break;
                        }

                        _ref4 = _step.value;
                        _ref5 = (0, _slicedToArray3['default'])(_ref4, 2);
                        fieldName = _ref5[0];
                        field = _ref5[1];

                        if (!(fieldName !== name)) {
                            _context.next = 21;
                            break;
                        }

                        if (!(field && field.get('unique') === unique)) {
                            _context.next = 21;
                            break;
                        }

                        otherValue = record.get(fieldName);

                        if (!(0, _isEmpty2['default'])(otherValue)) {
                            _context.next = 19;
                            break;
                        }

                        return _context.abrupt('return', true);

                    case 19:
                        fields[fieldName] = otherValue;
                        otherFields.push(field);

                    case 21:
                        _iteratorNormalCompletion = true;
                        _context.next = 9;
                        break;

                    case 24:
                        _context.next = 30;
                        break;

                    case 26:
                        _context.prev = 26;
                        _context.t0 = _context['catch'](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 30:
                        _context.prev = 30;
                        _context.prev = 31;

                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }

                    case 33:
                        _context.prev = 33;

                        if (!_didIteratorError) {
                            _context.next = 36;
                            break;
                        }

                        throw _iteratorError;

                    case 36:
                        return _context.finish(33);

                    case 37:
                        return _context.finish(30);

                    case 38:
                        invalid = dataSet.data.some(function (item) {
                            return item !== record && Object.keys(fields).every(function (field) {
                                return fields[field] === item.get(field);
                            });
                        });

                        if (invalid) {
                            _context.next = 48;
                            break;
                        }

                        totalPage = dataSet.totalPage, axios = dataSet.axios, _dataSet$transport = dataSet.transport, _dataSet$transport$va = _dataSet$transport.validate, validate = _dataSet$transport$va === undefined ? {} : _dataSet$transport$va, adapter = _dataSet$transport.adapter;
                        newConfig = (0, _utils.axiosAdapter)(validate, this, { unique: [fields] });
                        adapterConfig = adapter(newConfig, 'validate') || newConfig;

                        if (!(adapterConfig.url && totalPage > 1)) {
                            _context.next = 48;
                            break;
                        }

                        _context.next = 46;
                        return axios(adapterConfig);

                    case 46:
                        results = _context.sent;

                        invalid = [].concat(results).some(function (result) {
                            return !result;
                        });

                    case 48:
                        otherFields.forEach(function (otherField) {
                            return reportOtherField(otherField, invalid);
                        });

                        if (!invalid) {
                            _context.next = 51;
                            break;
                        }

                        return _context.abrupt('return', new _ValidationResult2['default']({
                            validationMessage: (0, _localeContext.$l)('Validator', 'unique'),
                            value: value,
                            ruleName: 'uniqueError'
                        }));

                    case 51:
                        return _context.abrupt('return', true);

                    case 52:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[7, 26, 30, 38], [31,, 33, 37]]);
    }));

    function uniqueError(_x, _x2) {
        return _ref3.apply(this, arguments);
    }

    return uniqueError;
}();

module.exports = exports['default'];