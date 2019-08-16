'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _ValidationResult = require('../ValidationResult');

var _ValidationResult2 = _interopRequireDefault(_ValidationResult);

var _localeContext = require('../../locale-context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function () {
    var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(value, _ref) {
        var customValidator = _ref.customValidator,
            name = _ref.name,
            record = _ref.record,
            form = _ref.form;
        var result;
        return _regenerator2['default'].wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(typeof customValidator === 'function')) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 3;
                        return customValidator(value, name, record || form);

                    case 3:
                        result = _context.sent;

                        if (!((0, _isString2['default'])(result) || result === false)) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', new _ValidationResult2['default']({
                            validationMessage: result || (0, _localeContext.$l)('Validator', 'unknown'),
                            value: value,
                            ruleName: 'customError'
                        }));

                    case 6:
                        return _context.abrupt('return', true);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function customError(_x, _x2) {
        return _ref2.apply(this, arguments);
    }

    return customError;
}();

module.exports = exports['default'];