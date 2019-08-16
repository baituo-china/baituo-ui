import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { PureComponent } from 'react';

var ExpandedRow = function (_PureComponent) {
    _inherits(ExpandedRow, _PureComponent);

    function ExpandedRow() {
        _classCallCheck(this, ExpandedRow);

        return _possibleConstructorReturn(this, (ExpandedRow.__proto__ || Object.getPrototypeOf(ExpandedRow)).apply(this, arguments));
    }

    _createClass(ExpandedRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                isExpanded = _props.isExpanded,
                children = _props.children,
                columns = _props.columns,
                record = _props.record,
                lock = _props.lock;

            if (typeof children === 'function') {
                return children(columns, record, isExpanded, lock);
            }
            return null;
        }
    }]);

    return ExpandedRow;
}(PureComponent);

export default ExpandedRow;