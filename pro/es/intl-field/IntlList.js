import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import TextField from '../text-field/TextField';
import Form from '../form/Form';
import localeContext from '../locale-context';
var IntlList = function (_Component) {
    _inherits(IntlList, _Component);

    function IntlList() {
        _classCallCheck(this, IntlList);

        return _possibleConstructorReturn(this, (IntlList.__proto__ || Object.getPrototypeOf(IntlList)).apply(this, arguments));
    }

    _createClass(IntlList, [{
        key: 'renderOptions',
        value: function renderOptions() {
            var _props = this.props,
                dataSet = _props.dataSet,
                name = _props.name,
                lang = _props.lang;
            var supports = localeContext.supports;

            return Object.keys(supports).map(function (key) {
                return React.createElement(TextField, { dataSet: dataSet, name: name ? name + '.' + key : key, autoFocus: key === lang, key: key, label: supports[key] });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                Form,
                null,
                this.renderOptions()
            );
        }
    }]);

    return IntlList;
}(Component);
IntlList.propTypes = {
    dataSet: PropTypes.object,
    name: PropTypes.string,
    lang: PropTypes.string
};
IntlList = tslib_1.__decorate([observer], IntlList);
export default IntlList;