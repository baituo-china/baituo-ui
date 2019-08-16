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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _CheckBox2 = require('../check-box/CheckBox');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Switch = function (_CheckBox) {
    (0, _inherits3['default'])(Switch, _CheckBox);

    function Switch() {
        (0, _classCallCheck3['default'])(this, Switch);
        return (0, _possibleConstructorReturn3['default'])(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Switch, [{
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (e.keyCode === _KeyCode2['default'].LEFT) {
                this.setChecked(false);
            } else if (e.keyCode === _KeyCode2['default'].RIGHT) {
                this.setChecked(true);
            }
            (0, _get3['default'])(Switch.prototype.__proto__ || Object.getPrototypeOf(Switch.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'getText',
        value: function getText() {
            var prefixCls = this.prefixCls,
                _props = this.props,
                children = _props.children,
                unCheckedChildren = _props.unCheckedChildren;

            var text = this.isChecked() ? children : unCheckedChildren || children;
            return _react2['default'].createElement(
                'span',
                { className: prefixCls + '-label' },
                text
            );
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            return;
        }
    }]);
    return Switch;
}(_CheckBox2.CheckBox);
Switch.displayName = 'Switch';
Switch.defaultProps = (0, _extends3['default'])({}, _CheckBox2.CheckBox.defaultProps, {
    suffixCls: 'switch'
});
tslib_1.__decorate([_autobind2['default']], Switch.prototype, "handleKeyDown", null);
Switch = tslib_1.__decorate([_mobxReact.observer], Switch);
exports['default'] = Switch;
module.exports = exports['default'];