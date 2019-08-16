import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { NumberField } from '../number-field/NumberField';
import autobind from '../_util/autobind';
import EventManager from '../_util/EventManager';
import omit from 'lodash/omit';
var Range = function (_NumberField) {
    _inherits(Range, _NumberField);

    function Range() {
        _classCallCheck(this, Range);

        var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).apply(this, arguments));

        _this.dragEvent = new EventManager(typeof window !== 'undefined' && document);
        _this.type = 'range';
        return _this;
    }

    _createClass(Range, [{
        key: 'getFieldType',
        value: function getFieldType() {
            return "number" /* number */;
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'getOtherProps', this).call(this), ['vertical']);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return _get(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'getValue', this).call(this) || 0;
        }
    }, {
        key: 'getWrapperClassNames',
        value: function getWrapperClassNames() {
            var vertical = this.props.vertical,
                prefixCls = this.prefixCls;

            return _get(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'getWrapperClassNames', this).call(this, _defineProperty({}, prefixCls + '-vertical', vertical));
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return React.createElement(
                'label',
                _extends({ key: 'wrapper' }, this.getWrapperProps()),
                React.createElement('input', _extends({}, this.getOtherProps(), { value: this.getValue() })),
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

            return React.createElement(
                'div',
                { className: prefixCls + '-track', onMouseDown: this.isReadOnly() || this.isDisabled() ? void 0 : this.handleTrackClick },
                React.createElement('div', { className: prefixCls + '-draghandle', style: vertical ? { bottom: percent } : { left: percent } }),
                React.createElement('div', { className: prefixCls + '-selection', style: vertical ? { height: percent } : { width: percent } })
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
}(NumberField);
Range.displayName = 'Range';
Range.propTypes = _extends({
    /**
     * 是否垂直方向
     * @default
     * false
     */
    vertical: PropTypes.bool
}, NumberField.propTypes);
Range.defaultProps = _extends({}, NumberField.defaultProps, {
    suffixCls: 'range',
    min: 0,
    step: 1,
    max: 100,
    vertical: false
});
tslib_1.__decorate([autobind], Range.prototype, "handleTrackClick", null);
tslib_1.__decorate([autobind], Range.prototype, "handleDragStart", null);
tslib_1.__decorate([autobind], Range.prototype, "handleDragEnd", null);
tslib_1.__decorate([autobind], Range.prototype, "handleDrag", null);
Range = tslib_1.__decorate([observer], Range);
export default Range;