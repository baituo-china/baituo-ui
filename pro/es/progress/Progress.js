import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import isNumber from 'lodash/isNumber';
import C7NProgress from '../../../es/progress';
import { FormField } from '../field/FormField';
var Progress = function (_FormField) {
    _inherits(Progress, _FormField);

    function Progress() {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).apply(this, arguments));
    }

    _createClass(Progress, [{
        key: 'getValue',
        value: function getValue() {
            var value = _get(Progress.prototype.__proto__ || Object.getPrototypeOf(Progress.prototype), 'getValue', this).call(this);
            if (isNumber(value)) {
                return value;
            }
            return this.props.percent;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(C7NProgress, _extends({}, omit(this.props, ['dataSet', 'showHelp', 'renderer']), { percent: this.getValue() }));
        }
    }]);

    return Progress;
}(FormField);
Progress.displayName = 'Progress';
Progress = tslib_1.__decorate([observer], Progress);
export default Progress;