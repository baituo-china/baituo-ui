import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import React from 'react';
import noop from 'lodash/noop';
import { getProPrefixCls } from '../../../es/configure';
import { getKey, open } from '../modal-container/ModalContainer';
import Icon from '../icon';
import { $l } from '../locale-context';
import { normalizeProps } from './utils';
export default function confirm(props) {
    var _this = this;

    props = normalizeProps(props);

    var _props = props,
        children = _props.children,
        _props$type = _props.type,
        type = _props$type === undefined ? 'confirm' : _props$type,
        _props$onOk = _props.onOk,
        _onOk = _props$onOk === undefined ? noop : _props$onOk,
        _props$onCancel = _props.onCancel,
        _onCancel = _props$onCancel === undefined ? noop : _props$onCancel,
        _props$iconType = _props.iconType,
        iconType = _props$iconType === undefined ? 'error' : _props$iconType,
        _props$header = _props.header,
        header = _props$header === undefined ? false : _props$header,
        _props$border = _props.border,
        border = _props$border === undefined ? false : _props$border,
        _props$okCancel = _props.okCancel,
        okCancel = _props$okCancel === undefined ? true : _props$okCancel,
        otherProps = _objectWithoutProperties(_props, ['children', 'type', 'onOk', 'onCancel', 'iconType', 'header', 'border', 'okCancel']);

    var prefixCls = getProPrefixCls('confirm');
    return new Promise(function (resolve) {
        open(_extends({
            key: getKey(),
            title: $l('Modal', 'confirm_modal_title'),
            header: header,
            border: border,
            destroyOnClose: true,
            okCancel: okCancel,
            closable: false,
            movable: false,
            style: { width: '4rem' },
            children: React.createElement(
                'table',
                { className: prefixCls },
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            { className: prefixCls + '-icon ' + prefixCls + '-' + type },
                            React.createElement(Icon, { type: iconType })
                        ),
                        React.createElement(
                            'td',
                            null,
                            children
                        )
                    )
                )
            ),
            onOk: function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                    var result;
                    return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _onOk();

                                case 2:
                                    result = _context.sent;

                                    if (result !== false) {
                                        resolve('ok');
                                    }
                                    return _context.abrupt('return', result);

                                case 5:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                function onOk() {
                    return _ref.apply(this, arguments);
                }

                return onOk;
            }(),
            onCancel: function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                    var result;
                    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return _onCancel();

                                case 2:
                                    result = _context2.sent;

                                    if (result !== false) {
                                        resolve('cancel');
                                    }
                                    return _context2.abrupt('return', result);

                                case 5:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }));

                function onCancel() {
                    return _ref2.apply(this, arguments);
                }

                return onCancel;
            }()
        }, otherProps));
    });
}