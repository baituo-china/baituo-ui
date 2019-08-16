'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _badInput = require('./badInput');

var _badInput2 = _interopRequireDefault(_badInput);

var _patternMismatch = require('./patternMismatch');

var _patternMismatch2 = _interopRequireDefault(_patternMismatch);

var _rangeOverflow = require('./rangeOverflow');

var _rangeOverflow2 = _interopRequireDefault(_rangeOverflow);

var _rangeUnderflow = require('./rangeUnderflow');

var _rangeUnderflow2 = _interopRequireDefault(_rangeUnderflow);

var _stepMismatch = require('./stepMismatch');

var _stepMismatch2 = _interopRequireDefault(_stepMismatch);

var _tooLong = require('./tooLong');

var _tooLong2 = _interopRequireDefault(_tooLong);

var _tooShort = require('./tooShort');

var _tooShort2 = _interopRequireDefault(_tooShort);

var _typeMismatch = require('./typeMismatch');

var _typeMismatch2 = _interopRequireDefault(_typeMismatch);

var _customError = require('./customError');

var _customError2 = _interopRequireDefault(_customError);

var _uniqueError = require('./uniqueError');

var _uniqueError2 = _interopRequireDefault(_uniqueError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var validationRules = [_badInput2['default'], _patternMismatch2['default'], _rangeOverflow2['default'], _rangeUnderflow2['default'], _stepMismatch2['default'], _tooLong2['default'], _tooShort2['default'], _typeMismatch2['default'], _customError2['default'], _uniqueError2['default']];
exports['default'] = validationRules;
module.exports = exports['default'];