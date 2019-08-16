import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import interopDefault from '../_util/interopDefault';
import { changeConfirmLocale } from '../modal/locale';
function setMomentLocale(locale) {
    if (locale && locale.locale) {
        interopDefault(moment).locale(locale.locale);
    } else {
        interopDefault(moment).locale('en');
    }
}

var LocaleProvider = function (_Component) {
    _inherits(LocaleProvider, _Component);

    function LocaleProvider() {
        _classCallCheck(this, LocaleProvider);

        return _possibleConstructorReturn(this, (LocaleProvider.__proto__ || Object.getPrototypeOf(LocaleProvider)).apply(this, arguments));
    }

    _createClass(LocaleProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                c7nLocale: _extends({}, this.props.locale, {
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

            changeConfirmLocale(locale && locale.Modal);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            changeConfirmLocale();
        }
    }, {
        key: 'render',
        value: function render() {
            return Children.only(this.props.children);
        }
    }]);

    return LocaleProvider;
}(Component);

export default LocaleProvider;

LocaleProvider.propTypes = {
    locale: PropTypes.object
};
LocaleProvider.defaultProps = {
    locale: {}
};
LocaleProvider.childContextTypes = {
    c7nLocale: PropTypes.object
};