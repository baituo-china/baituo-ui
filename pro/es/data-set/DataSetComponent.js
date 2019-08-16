import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import ViewComponent from '../core/ViewComponent';
import { computed } from 'mobx';

var DataSetComponent = function (_ViewComponent) {
    _inherits(DataSetComponent, _ViewComponent);

    function DataSetComponent() {
        _classCallCheck(this, DataSetComponent);

        return _possibleConstructorReturn(this, (DataSetComponent.__proto__ || Object.getPrototypeOf(DataSetComponent)).apply(this, arguments));
    }

    _createClass(DataSetComponent, [{
        key: 'getObservableProps',
        value: function getObservableProps(props, _context) {
            return {
                dataSet: props.dataSet
            };
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(DataSetComponent.prototype.__proto__ || Object.getPrototypeOf(DataSetComponent.prototype), 'getOtherProps', this).call(this), ['dataSet']);
        }
    }, {
        key: 'dataSet',
        get: function get() {
            return this.observableProps.dataSet;
        }
    }, {
        key: 'lang',
        get: function get() {
            var dataSet = this.dataSet;

            if (dataSet && dataSet.lang) {
                return dataSet.lang;
            }
            return _get(DataSetComponent.prototype.__proto__ || Object.getPrototypeOf(DataSetComponent.prototype), 'lang', this);
        }
    }]);

    return DataSetComponent;
}(ViewComponent);

export default DataSetComponent;

DataSetComponent.propTypes = _extends({
    dataSet: PropTypes.object
}, ViewComponent.propTypes);
tslib_1.__decorate([computed], DataSetComponent.prototype, "dataSet", null);
tslib_1.__decorate([computed], DataSetComponent.prototype, "lang", null);