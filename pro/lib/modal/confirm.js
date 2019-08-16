'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports['default'] = confirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

var _configure = require('../../../lib/configure');

var _ModalContainer = require('../modal-container/ModalContainer');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _localeContext = require('../locale-context');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function confirm(props) {
    var _this = this;

    props = (0, _utils.normalizeProps)(props);

    var _props = props,
        children = _props.children,
        _props$type = _props.type,
        type = _props$type === undefined ? 'confirm' : _props$type,
        _props$onOk = _props.onOk,
        _onOk = _props$onOk === undefined ? _noop2['default'] : _props$onOk,
        _props$onCancel = _props.onCancel,
        _onCancel = _props$onCancel === undefined ? _noop2['default'] : _props$onCancel,
        _props$iconType = _props.iconType,
        iconType = _props$iconType === undefined ? 'error' : _props$iconType,
        _props$header = _props.header,
        header = _props$header === undefined ? false : _props$header,
        _props$border = _props.border,
        border = _props$border === undefined ? false : _props$border,
        _props$okCancel = _props.okCancel,
        okCancel = _props$okCancel === undefined ? true : _props$okCancel,
        otherProps = (0, _objectWithoutProperties3['default'])(_props, ['children', 'type', 'onOk', 'onCancel', 'iconType', 'header', 'border', 'okCancel']);

    var prefixCls = (0, _configure.getProPrefixCls)('confirm');
    return new Promise(function (resolve) {
        (0, _ModalContainer.open)((0, _extends3['default'])({
            key: (0, _ModalContainer.getKey)(),
            title: (0, _localeContext.$l)('Modal', 'confirm_modal_title'),
            header: header,
            border: border,
            destroyOnClose: true,
            okCancel: okCancel,
            closable: false,
            movable: false,
            style: { width: '4rem' },
            children: _react2['default'].createElement(
                'table',
                { className: prefixCls },
                _react2['default'].createElement(
                    'tbody',
                    null,
                    _react2['default'].createElement(
                        'tr',
                        null,
                        _react2['default'].createElement(
                            'td',
                            { className: prefixCls + '-icon ' + prefixCls + '-' + type },
                            _react2['default'].createElement(_icon2['default'], { type: iconType })
                        ),
                        _react2['default'].createElement(
                            'td',
                            null,
                            children
                        )
                    )
                )
            ),
            onOk: function () {
                var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
                    var result;
                    return _regenerator2['default'].wrap(function _callee$(_context) {
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
                var _ref2 = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee2() {
                    var result;
                    return _regenerator2['default'].wrap(function _callee2$(_context2) {
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
module.exports = exports['default'];