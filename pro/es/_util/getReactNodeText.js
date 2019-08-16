import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import { isValidElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import toString from 'lodash/toString';
export default (function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(node) {
        var textDiv, textContent;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!node) {
                            _context.next = 13;
                            break;
                        }

                        if (!(isString(node) || isNumber(node))) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', String(node));

                    case 3:
                        if (!(typeof window !== 'undefined' && isValidElement(node))) {
                            _context.next = 12;
                            break;
                        }

                        textDiv = document.createElement('div');

                        document.body.appendChild(textDiv);
                        _context.next = 8;
                        return new Promise(function (resolve) {
                            return render(node, textDiv, resolve);
                        });

                    case 8:
                        textContent = textDiv.textContent;

                        unmountComponentAtNode(textDiv);
                        if (textDiv.parentNode) {
                            textDiv.parentNode.removeChild(textDiv);
                        }
                        return _context.abrupt('return', textContent || '');

                    case 12:
                        return _context.abrupt('return', toString(node));

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
})();