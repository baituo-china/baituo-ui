import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import prettier from 'prettier/standalone';
import plugins from 'prettier/parser-html';
import { removeUnprintableChar } from '../utils';
export var HTMLFormatter = function () {
    function HTMLFormatter() {
        _classCallCheck(this, HTMLFormatter);
    }

    _createClass(HTMLFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : HTMLFormatter.defaultOptions;

            return prettier.format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return removeUnprintableChar(formattedText);
        }
    }]);

    return HTMLFormatter;
}();
HTMLFormatter.defaultOptions = { parser: 'html', plugins: [plugins] };
export default new HTMLFormatter();