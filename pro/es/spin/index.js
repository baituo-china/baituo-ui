import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { observer } from 'mobx-react';
import C7NSpin from '../../../es/spin';
import DataSetComponent from '../data-set/DataSetComponent';
var Spin = function (_DataSetComponent) {
    _inherits(Spin, _DataSetComponent);

    function Spin() {
        _classCallCheck(this, Spin);

        return _possibleConstructorReturn(this, (Spin.__proto__ || Object.getPrototypeOf(Spin)).apply(this, arguments));
    }

    _createClass(Spin, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dataSet = _props.dataSet,
                otherProps = _objectWithoutProperties(_props, ['dataSet']);

            var props = {};
            if (dataSet) {
                props.spinning = dataSet.status !== "ready" /* ready */;
            }
            return React.createElement(C7NSpin, _extends({}, otherProps, props));
        }
    }]);

    return Spin;
}(DataSetComponent);
Spin.displayName = 'Spin';
Spin = tslib_1.__decorate([observer], Spin);
export default Spin;