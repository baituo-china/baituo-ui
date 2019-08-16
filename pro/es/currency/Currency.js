import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import { observer } from 'mobx-react';
import { NumberField } from '../number-field/NumberField';
import { formatCurrency } from '../number-field/utils';
var Currency = function (_NumberField) {
    _inherits(Currency, _NumberField);

    function Currency() {
        _classCallCheck(this, Currency);

        return _possibleConstructorReturn(this, (Currency.__proto__ || Object.getPrototypeOf(Currency)).apply(this, arguments));
    }

    _createClass(Currency, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "currency" /* currency */;
        }
    }, {
        key: 'getFormatter',
        value: function getFormatter() {
            return formatCurrency;
        }
    }, {
        key: 'getFormatOptions',
        value: function getFormatOptions() {
            return {
                currency: this.getProp('currency')
            };
        }
    }]);

    return Currency;
}(NumberField);
Currency.displayName = 'Currency';
Currency.format = formatCurrency;
Currency = tslib_1.__decorate([observer], Currency);
export default Currency;