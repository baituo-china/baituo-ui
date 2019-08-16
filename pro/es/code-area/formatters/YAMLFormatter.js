import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import prettier from 'prettier/standalone';
import plugins from 'prettier/parser-yaml';
export var YAMLFormatter = function () {
    function YAMLFormatter() {
        _classCallCheck(this, YAMLFormatter);
    }

    _createClass(YAMLFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : YAMLFormatter.defaultOptions;

            return prettier.format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return formattedText; // do nothing
        }
    }]);

    return YAMLFormatter;
}();
YAMLFormatter.defaultOptions = { parser: 'yaml', plugins: [plugins] };
export default new YAMLFormatter();