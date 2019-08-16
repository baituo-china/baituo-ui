import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component } from 'react';
import PropTypes from 'prop-types';

var LocaleReceiver = function (_Component) {
    _inherits(LocaleReceiver, _Component);

    function LocaleReceiver() {
        _classCallCheck(this, LocaleReceiver);

        return _possibleConstructorReturn(this, (LocaleReceiver.__proto__ || Object.getPrototypeOf(LocaleReceiver)).apply(this, arguments));
    }

    _createClass(LocaleReceiver, [{
        key: 'getLocale',
        value: function getLocale() {
            var _props = this.props,
                componentName = _props.componentName,
                defaultLocale = _props.defaultLocale;
            var c7nLocale = this.context.c7nLocale;

            var localeFromContext = c7nLocale && c7nLocale[componentName];
            return _extends({}, typeof defaultLocale === 'function' ? defaultLocale() : defaultLocale, localeFromContext || {});
        }
    }, {
        key: 'getLocaleCode',
        value: function getLocaleCode() {
            var c7nLocale = this.context.c7nLocale;

            var localeCode = c7nLocale && c7nLocale.locale;
            // Had use LocaleProvide but didn't set locale
            if (c7nLocale && c7nLocale.exist && !localeCode) {
                return 'en-us';
            }
            return localeCode;
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children(this.getLocale(), this.getLocaleCode());
        }
    }]);

    return LocaleReceiver;
}(Component);

export default LocaleReceiver;

LocaleReceiver.contextTypes = {
    c7nLocale: PropTypes.object
};