'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _reactDom = require('react-dom');

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _toString = require('lodash/toString');

var _toString2 = _interopRequireDefault(_toString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function () {
    var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(node) {
        var textDiv, textContent;
        return _regenerator2['default'].wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!node) {
                            _context.next = 13;
                            break;
                        }

                        if (!((0, _isString2['default'])(node) || (0, _isNumber2['default'])(node))) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', String(node));

                    case 3:
                        if (!(typeof window !== 'undefined' && (0, _react.isValidElement)(node))) {
                            _context.next = 12;
                            break;
                        }

                        textDiv = document.createElement('div');

                        document.body.appendChild(textDiv);
                        _context.next = 8;
                        return new Promise(function (resolve) {
                            return (0, _reactDom.render)(node, textDiv, resolve);
                        });

                    case 8:
                        textContent = textDiv.textContent;

                        (0, _reactDom.unmountComponentAtNode)(textDiv);
                        if (textDiv.parentNode) {
                            textDiv.parentNode.removeChild(textDiv);
                        }
                        return _context.abrupt('return', textContent || '');

                    case 12:
                        return _context.abrupt('return', (0, _toString2['default'])(node));

                    case 13:
                        return _context.abrupt('return', '');

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function getReactNodeText(_x) {
        return _ref.apply(this, arguments);
    }

    return getReactNodeText;
}();

module.exports = exports['default'];