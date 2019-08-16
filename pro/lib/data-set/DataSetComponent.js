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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tslib = require('tslib');

var tslib_1 = _interopRequireWildcard(_tslib);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _ViewComponent2 = require('../core/ViewComponent');

var _ViewComponent3 = _interopRequireDefault(_ViewComponent2);

var _mobx = require('mobx');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DataSetComponent = function (_ViewComponent) {
    (0, _inherits3['default'])(DataSetComponent, _ViewComponent);

    function DataSetComponent() {
        (0, _classCallCheck3['default'])(this, DataSetComponent);
        return (0, _possibleConstructorReturn3['default'])(this, (DataSetComponent.__proto__ || Object.getPrototypeOf(DataSetComponent)).apply(this, arguments));
    }

    (0, _createClass3['default'])(DataSetComponent, [{
        key: 'getObservableProps',
        value: function getObservableProps(props, _context) {
            return {
                dataSet: props.dataSet
            };
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(DataSetComponent.prototype.__proto__ || Object.getPrototypeOf(DataSetComponent.prototype), 'getOtherProps', this).call(this), ['dataSet']);
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
            return (0, _get3['default'])(DataSetComponent.prototype.__proto__ || Object.getPrototypeOf(DataSetComponent.prototype), 'lang', this);
        }
    }]);
    return DataSetComponent;
}(_ViewComponent3['default']);

exports['default'] = DataSetComponent;

DataSetComponent.propTypes = (0, _extends3['default'])({
    dataSet: _propTypes2['default'].object
}, _ViewComponent3['default'].propTypes);
tslib_1.__decorate([_mobx.computed], DataSetComponent.prototype, "dataSet", null);
tslib_1.__decorate([_mobx.computed], DataSetComponent.prototype, "lang", null);
module.exports = exports['default'];