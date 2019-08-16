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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('../text-field/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Form = require('../form/Form');

var _Form2 = _interopRequireDefault(_Form);

var _localeContext = require('../locale-context');

var _localeContext2 = _interopRequireDefault(_localeContext);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var IntlList = function (_Component) {
    (0, _inherits3['default'])(IntlList, _Component);

    function IntlList() {
        (0, _classCallCheck3['default'])(this, IntlList);
        return (0, _possibleConstructorReturn3['default'])(this, (IntlList.__proto__ || Object.getPrototypeOf(IntlList)).apply(this, arguments));
    }

    (0, _createClass3['default'])(IntlList, [{
        key: 'renderOptions',
        value: function renderOptions() {
            var _props = this.props,
                dataSet = _props.dataSet,
                name = _props.name,
                lang = _props.lang;
            var supports = _localeContext2['default'].supports;

            return Object.keys(supports).map(function (key) {
                return _react2['default'].createElement(_TextField2['default'], { dataSet: dataSet, name: name ? name + '.' + key : key, autoFocus: key === lang, key: key, label: supports[key] });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _Form2['default'],
                null,
                this.renderOptions()
            );
        }
    }]);
    return IntlList;
}(_react.Component);
IntlList.propTypes = {
    dataSet: _propTypes2['default'].object,
    name: _propTypes2['default'].string,
    lang: _propTypes2['default'].string
};
IntlList = tslib_1.__decorate([_mobxReact.observer], IntlList);
exports['default'] = IntlList;
module.exports = exports['default'];