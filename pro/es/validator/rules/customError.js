import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import isString from 'lodash/isString';
import ValidationResult from '../ValidationResult';
import { $l } from '../../locale-context';
export default (function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(value, _ref) {
        var customValidator = _ref.customValidator,
            name = _ref.name,
            record = _ref.record,
            form = _ref.form;
        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
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

                        if (!(isString(result) || result === false)) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', new ValidationResult({
                            validationMessage: result || $l('Validator', 'unknown'),
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
})();