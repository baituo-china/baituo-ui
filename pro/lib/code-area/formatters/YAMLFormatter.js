'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YAMLFormatter = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _standalone = require('prettier/standalone');

var _standalone2 = _interopRequireDefault(_standalone);

var _parserYaml = require('prettier/parser-yaml');

var _parserYaml2 = _interopRequireDefault(_parserYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var YAMLFormatter = exports.YAMLFormatter = function () {
    function YAMLFormatter() {
        (0, _classCallCheck3['default'])(this, YAMLFormatter);
    }

    (0, _createClass3['default'])(YAMLFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : YAMLFormatter.defaultOptions;

            return _standalone2['default'].format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return formattedText; // do nothing
        }
    }]);
    return YAMLFormatter;
}();

YAMLFormatter.defaultOptions = { parser: 'yaml', plugins: [_parserYaml2['default']] };
exports['default'] = new YAMLFormatter();