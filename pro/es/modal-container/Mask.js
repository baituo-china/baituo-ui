import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ViewComponent from '../core/ViewComponent';

var Mask = function (_ViewComponent) {
    _inherits(Mask, _ViewComponent);

    function Mask() {
        _classCallCheck(this, Mask);

        return _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).apply(this, arguments));
    }

    _createClass(Mask, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', this.getMergedProps());
        }
    }]);

    return Mask;
}(ViewComponent);

export default Mask;

Mask.displayName = 'Mask';
Mask.defaultProps = {
    suffixCls: 'mask'
};