'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _NumberField2 = require('../number-field/NumberField');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _EventManager = require('../_util/EventManager');

var _EventManager2 = _interopRequireDefault(_EventManager);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Range = function (_NumberField) {
    (0, _inherits3['default'])(Range, _NumberField);

    function Range() {
        (0, _classCallCheck3['default'])(this, Range);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Range.__proto__ || Object.getPrototypeOf(Range)).apply(this, arguments));

        _this.dragEvent = new _EventManager2['default'](typeof window !== 'undefined' && document);
        _this.type = 'range';
        return _this;
    }

    (0, _createClass3['default'])(Range, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "number" /* number */;
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'getOtherProps', this).call(this), ['vertical']);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return (0, _get3['default'])(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'getValue', this).call(this) || 0;
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var vertical = this.props.vertical,
                prefixCls = this.prefixCls;

            return (0, _get3['default'])(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'getWrapperClassNames', this).call(this, (0, _defineProperty3['default'])({}, prefixCls + '-vertical', vertical));
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return _react2['default'].createElement(
                'label',
                (0, _extends3['default'])({ key: 'wrapper' }, this.getWrapperProps()),
                _react2['default'].createElement('input', (0, _extends3['default'])({}, this.getOtherProps(), { value: this.getValue() })),
                this.renderTrack(),
                this.renderFloatLabel()
            );
        }
    }, {
        key: 'renderTrack',
        value: function renderTrack() {
            var percent = this.getPercent();
            var vertical = this.props.vertical,
                prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-track', onMouseDown: this.isReadOnly() || this.isDisabled() ? void 0 : this.handleTrackClick },
                _react2['default'].createElement('div', { className: prefixCls + '-draghandle', style: vertical ? { bottom: percent } : { left: percent } }),
                _react2['default'].createElement('div', { className: prefixCls + '-selection', style: vertical ? { height: percent } : { width: percent } })
            );
        }
    }, {
        key: 'handleTrackClick',
        value: function handleTrackClick(e) {
            this.track = e.currentTarget;
            this.handleDrag(e);
            this.handleDragStart();
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart() {
            this.dragEvent.addEventListener('mousemove', this.handleDrag).addEventListener('mouseup', this.handleDragEnd);
        }
    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this.dragEvent.removeEventListener('mousemove', this.handleDrag).removeEventListener('mouseup', this.handleDragEnd);
        }
    }, {
        key: 'handleDrag',
        value: function handleDrag(e) {
            var track = this.track;
            var vertical = this.props.vertical;

            var max = this.getProp('max');
            var min = this.getProp('min');
            var step = this.getProp('step');

            var _track$getBoundingCli = track.getBoundingClientRect(),
                bottom = _track$getBoundingCli.bottom,
                left = _track$getBoundingCli.left;

            var length = vertical ? bottom - e.clientY : e.clientX - left;
            var totalLength = vertical ? track.clientHeight : track.clientWidth;
            var oneStepLength = 1 / ((max - min) / step) * totalLength;
            var value = min;
            if (length <= 0) {
                value = min;
            } else if (length >= totalLength) {
                value = max;
            } else {
                value = Math.round(length / oneStepLength) * step + min;
            }
            this.setValue(value);
        }
    }, {
        key: 'getPercent',
        value: function getPercent() {
            var value = this.getValue();
            var max = this.getProp('max');
            var min = this.getProp('min');
            if (value <= min) {
                return 0;
            } else if (value >= max) {
                return '100%';
            } else {
                return (value - min) / (max - min) * 100 + '%';
            }
        }
    }]);
    return Range;
}(_NumberField2.NumberField);
Range.displayName = 'Range';
Range.propTypes = (0, _extends3['default'])({
    /**
     * 是否垂直方向
     * @default
     * false
     */
    vertical: _propTypes2['default'].bool
}, _NumberField2.NumberField.propTypes);
Range.defaultProps = (0, _extends3['default'])({}, _NumberField2.NumberField.defaultProps, {
    suffixCls: 'range',
    min: 0,
    step: 1,
    max: 100,
    vertical: false
});
tslib_1.__decorate([_autobind2['default']], Range.prototype, "handleTrackClick", null);
tslib_1.__decorate([_autobind2['default']], Range.prototype, "handleDragStart", null);
tslib_1.__decorate([_autobind2['default']], Range.prototype, "handleDragEnd", null);
tslib_1.__decorate([_autobind2['default']], Range.prototype, "handleDrag", null);
Range = tslib_1.__decorate([_mobxReact.observer], Range);
exports['default'] = Range;
module.exports = exports['default'];