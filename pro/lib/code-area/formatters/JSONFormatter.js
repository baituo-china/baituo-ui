'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.JSONFormatter = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _standalone = require('prettier/standalone');

var _standalone2 = _interopRequireDefault(_standalone);

var _parserBabylon = require('prettier/parser-babylon');

var _parserBabylon2 = _interopRequireDefault(_parserBabylon);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var JSONFormatter = exports.JSONFormatter = function () {
    function JSONFormatter() {
        (0, _classCallCheck3['default'])(this, JSONFormatter);
    }

    (0, _createClass3['default'])(JSONFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSONFormatter.defaultOptions;

            return _standalone2['default'].format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return (0, _utils.removeUnprintableChar)(formattedText);
        }
    }]);
    return JSONFormatter;
}();

JSONFormatter.defaultOptions = { parser: 'json', plugins: [_parserBabylon2['default']] };
exports['default'] = new JSONFormatter();