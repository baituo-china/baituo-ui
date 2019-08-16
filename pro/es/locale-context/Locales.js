import _extends from "babel-runtime/helpers/extends";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";

var Locales = function () {
    function Locales(locales) {
        _classCallCheck(this, Locales);

        _extends(this, locales);
    }

    _createClass(Locales, [{
        key: "get",
        value: function get(lang) {
            return this[lang];
        }
    }, {
        key: "set",
        value: function set(lang, value) {
            this[lang] = value;
        }
    }]);

    return Locales;
}();

export default Locales;