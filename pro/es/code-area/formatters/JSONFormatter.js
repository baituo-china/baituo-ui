import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import prettier from 'prettier/standalone';
import plugins from 'prettier/parser-babylon';
import { removeUnprintableChar } from '../utils';
export var JSONFormatter = function () {
    function JSONFormatter() {
        _classCallCheck(this, JSONFormatter);
    }

    _createClass(JSONFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSONFormatter.defaultOptions;

            return prettier.format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return removeUnprintableChar(formattedText);
        }
    }]);

    return JSONFormatter;
}();
JSONFormatter.defaultOptions = { parser: 'json', plugins: [plugins] };
export default new JSONFormatter();