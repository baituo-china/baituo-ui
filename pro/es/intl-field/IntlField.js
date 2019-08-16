import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import { observer } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';
import { TextField } from '../text-field/TextField';
import Icon from '../icon';
import { open } from '../modal-container/ModalContainer';
import IntlList from './IntlList';
import DataSet from '../data-set/DataSet';
import autobind from '../_util/autobind';
import KeyCode from '../../../es/_util/KeyCode';
import { stopEvent } from '../_util/EventManager';
import Progress from '../progress';
import { $l } from '../locale-context';
var IntlField = function (_TextField) {
    _inherits(IntlField, _TextField);

    function IntlField() {
        var _this2 = this;

        _classCallCheck(this, IntlField);

        var _this = _possibleConstructorReturn(this, (IntlField.__proto__ || Object.getPrototypeOf(IntlField)).apply(this, arguments));

        _this.openModal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var modalProps, record, lang, name, value, current;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (_this.modal) {
                                _context.next = 16;
                                break;
                            }

                            modalProps = _this.props.modalProps;
                            record = _this.record, lang = _this.lang, name = _this.name;

                            if (!record) {
                                _context.next = 12;
                                break;
                            }

                            runInAction(function () {
                                _this.loading = true;
                            });
                            _context.prev = 5;
                            _context.next = 8;
                            return record.tls(name);

                        case 8:
                            _context.prev = 8;

                            runInAction(function () {
                                _this.loading = false;
                            });
                            return _context.finish(8);

                        case 11:
                            if (record.tlsDataSet) {
                                _this.tlsDataSet = record.tlsDataSet;
                            }

                        case 12:
                            if (!_this.tlsDataSet) {
                                value = _defineProperty({}, lang, _this.getValue());

                                _this.tlsDataSet = new DataSet({
                                    data: [name ? _defineProperty({}, name, value) : value]
                                });
                            }
                            current = _this.tlsDataSet.current;

                            if (current) {
                                _this.storeLocales(current.data);
                            } else {
                                _this.tlsDataSet.addEventListener('load', _this.handleTlsLoad);
                            }
                            _this.modal = open(_extends({
                                title: $l('IntlField', 'modal_title'),
                                children: React.createElement(IntlList, { dataSet: _this.tlsDataSet, name: name, lang: lang }),
                                onClose: _this.handleIntlListClose,
                                onOk: _this.handleIntlListOk,
                                onCancel: _this.handleIntlListCancel,
                                destroyOnClose: true
                            }, modalProps));

                        case 16:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[5,, 8, 11]]);
        }));
        _this.handleIntlListClose = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            delete _this.modal;
                            _this.focus();

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));
        _this.handleIntlListOk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
            var tlsDataSet, current, lang, name;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            tlsDataSet = _this.tlsDataSet;
                            current = tlsDataSet.current;

                            if (!current) {
                                _context3.next = 11;
                                break;
                            }

                            _context3.next = 5;
                            return current.validate(true);

                        case 5:
                            if (_context3.sent) {
                                _context3.next = 9;
                                break;
                            }

                            return _context3.abrupt('return', false);

                        case 9:
                            lang = _this.lang, name = _this.name;

                            _this.setValue(current.get(name ? name + '.' + lang : lang));

                        case 11:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));
        _this.handleIntlListCancel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
            var locales, name, current;
            return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            locales = _this.locales, name = _this.name, current = _this.tlsDataSet.current;

                            if (current && locales) {
                                Object.keys(locales).forEach(function (key) {
                                    return current.set(name ? name + '.' + key : key, locales[key]);
                                });
                            }

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this2);
        }));
        _this.handleTlsLoad = function () {
            var current = _this.tlsDataSet.current;

            if (current) {
                _this.storeLocales(current.data);
            }
        };
        return _this;
    }

    _createClass(IntlField, [{
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (e.keyCode === KeyCode.DOWN) {
                stopEvent(e);
                this.openModal();
            }
            _get(IntlField.prototype.__proto__ || Object.getPrototypeOf(IntlField.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (this.modal) {
                e.preventDefault();
            }
            _get(IntlField.prototype.__proto__ || Object.getPrototypeOf(IntlField.prototype), 'handleBlur', this).call(this, e);
        }
    }, {
        key: 'storeLocales',
        value: function storeLocales(data) {
            var name = this.name;

            this.locales = cloneDeep(name ? data[name] : data);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            _get(IntlField.prototype.__proto__ || Object.getPrototypeOf(IntlField.prototype), 'setValue', this).call(this, value);
            if (this.tlsDataSet && !this.record) {
                var current = this.tlsDataSet.current;
                var lang = this.lang,
                    name = this.name;

                if (current) {
                    current.set(name ? name + '.' + lang : lang, this.value);
                }
            }
        }
    }, {
        key: 'getSuffix',
        value: function getSuffix() {
            var suffix = this.props.suffix;

            return this.wrapperSuffix(this.loading ? React.createElement(Progress, { size: "small" /* small */, type: "loading" /* loading */ }) : suffix || React.createElement(Icon, { type: 'language' }), {
                onClick: this.isDisabled() || this.isReadOnly() ? void 0 : this.openModal
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.modal) {
                this.modal.close();
            }
            if (this.tlsDataSet) {
                this.tlsDataSet.removeEventListener("load" /* load */, this.handleTlsLoad);
            }
        }
    }]);

    return IntlField;
}(TextField);
IntlField.displayName = 'IntlField';
tslib_1.__decorate([observable], IntlField.prototype, "loading", void 0);
tslib_1.__decorate([autobind], IntlField.prototype, "handleKeyDown", null);
tslib_1.__decorate([autobind], IntlField.prototype, "handleBlur", null);
IntlField = tslib_1.__decorate([observer], IntlField);
export default IntlField;