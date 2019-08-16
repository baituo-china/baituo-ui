'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _TextField2 = require('../text-field/TextField');

var _localeContext = require('../locale-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var UrlField = function (_TextField) {
    (0, _inherits3['default'])(UrlField, _TextField);

    function UrlField() {
        (0, _classCallCheck3['default'])(this, UrlField);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (UrlField.__proto__ || Object.getPrototypeOf(UrlField)).apply(this, arguments));

        _this.type = 'url';
        return _this;
    }

    (0, _createClass3['default'])(UrlField, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "url" /* url */;
        }
    }, {
        key: 'defaultValidationMessages',
        get: function get() {
            var label = this.getProp('label');
            return {
                valueMissing: (0, _localeContext.$l)('UrlField', label ? 'value_missing_with_label' : 'value_missing', { label: label }),
                typeMismatch: (0, _localeContext.$l)('UrlField', 'type_mismatch')
            };
        }
    }]);
    return UrlField;
}(_TextField2.TextField);
UrlField.displayName = 'UrlField';
tslib_1.__decorate([_mobx.computed], UrlField.prototype, "defaultValidationMessages", null);
UrlField = tslib_1.__decorate([_mobxReact.observer], UrlField);
exports['default'] = UrlField;
module.exports = exports['default'];