'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _interopDefault = require('../_util/interopDefault');

var _interopDefault2 = _interopRequireDefault(_interopDefault);

var _locale = require('../modal/locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function setMomentLocale(locale) {
    if (locale && locale.locale) {
        (0, _interopDefault2['default'])(_moment2['default']).locale(locale.locale);
    } else {
        (0, _interopDefault2['default'])(_moment2['default']).locale('en');
    }
}

var LocaleProvider = function (_Component) {
    (0, _inherits3['default'])(LocaleProvider, _Component);

    function LocaleProvider() {
        (0, _classCallCheck3['default'])(this, LocaleProvider);
        return (0, _possibleConstructorReturn3['default'])(this, (LocaleProvider.__proto__ || Object.getPrototypeOf(LocaleProvider)).apply(this, arguments));
    }

    (0, _createClass3['default'])(LocaleProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                c7nLocale: (0, _extends3['default'])({}, this.props.locale, {
                    exist: true
                })
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            setMomentLocale(this.props.locale);
            this.componentDidUpdate();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var locale = this.props.locale;

            var nextLocale = nextProps.locale;
            if (locale !== nextLocale) {
                setMomentLocale(nextProps.locale);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var locale = this.props.locale;

            (0, _locale.changeConfirmLocale)(locale && locale.Modal);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _locale.changeConfirmLocale)();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react.Children.only(this.props.children);
        }
    }]);
    return LocaleProvider;
}(_react.Component);

exports['default'] = LocaleProvider;

LocaleProvider.propTypes = {
    locale: _propTypes2['default'].object
};
LocaleProvider.defaultProps = {
    locale: {}
};
LocaleProvider.childContextTypes = {
    c7nLocale: _propTypes2['default'].object
};
module.exports = exports['default'];