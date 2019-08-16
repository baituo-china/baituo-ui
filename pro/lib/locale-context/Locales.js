"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Locales = function () {
    function Locales(locales) {
        (0, _classCallCheck3["default"])(this, Locales);

        (0, _extends3["default"])(this, locales);
    }

    (0, _createClass3["default"])(Locales, [{
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

exports["default"] = Locales;
module.exports = exports["default"];