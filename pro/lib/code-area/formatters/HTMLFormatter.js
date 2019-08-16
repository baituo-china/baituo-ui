'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTMLFormatter = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _standalone = require('prettier/standalone');

var _standalone2 = _interopRequireDefault(_standalone);

var _parserHtml = require('prettier/parser-html');

var _parserHtml2 = _interopRequireDefault(_parserHtml);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HTMLFormatter = exports.HTMLFormatter = function () {
    function HTMLFormatter() {
        (0, _classCallCheck3['default'])(this, HTMLFormatter);
    }

    (0, _createClass3['default'])(HTMLFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : HTMLFormatter.defaultOptions;

            return _standalone2['default'].format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return (0, _utils.removeUnprintableChar)(formattedText);
        }
    }]);
    return HTMLFormatter;
}();

HTMLFormatter.defaultOptions = { parser: 'html', plugins: [_parserHtml2['default']] };
exports['default'] = new HTMLFormatter();