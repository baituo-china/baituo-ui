import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import prettier from 'prettier/standalone';
import plugins from 'prettier/parser-babylon';
import { removeUnprintableChar } from '../utils';
export var JSFormatter = function () {
    function JSFormatter() {
        _classCallCheck(this, JSFormatter);
    }

    _createClass(JSFormatter, [{
        key: 'getFormatted',
        value: function getFormatted(rawText) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSFormatter.defaultOptions;

            return prettier.format(rawText, options);
        }
    }, {
        key: 'getRaw',
        value: function getRaw(formattedText) {
            return removeUnprintableChar(formattedText);
        }
    }]);

    return JSFormatter;
}();
JSFormatter.defaultOptions = { parser: 'babel', plugins: [plugins] };
export default new JSFormatter();