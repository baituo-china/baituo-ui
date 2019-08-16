import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import * as tslib_1 from "tslib";
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import { action, computed, observable, toJS } from 'mobx';
import { pxToRem } from '../../../es/_util/UnitConvertor';
import KeyCode from '../../../es/_util/KeyCode';
import Icon from '../icon';
import { open } from '../modal-container/ModalContainer';
import LovView from './LovView';
import DataSet from '../data-set/DataSet';
import lovStore from '../stores/LovCodeStore';
import autobind from '../_util/autobind';
import { stopEvent } from '../_util/EventManager';
import { Select } from '../select/Select';
var Lov = function (_Select) {
    _inherits(Lov, _Select);

    function Lov() {
        var _this2 = this;

        _classCallCheck(this, Lov);

        var _this = _possibleConstructorReturn(this, (Lov.__proto__ || Object.getPrototypeOf(Lov)).apply(this, arguments));

        _this.openModal = action(function () {
            var config = _this.getConfig();
            var options = _this.options;
            var _this$props = _this.props,
                modalProps = _this$props.modalProps,
                noCache = _this$props.noCache;

            if (!_this.modal && config && options) {
                var width = config.width,
                    title = config.title;

                options.unSelectAll();
                options.clearCachedSelected();
                _this.modal = open(_extends({
                    title: title,
                    children: React.createElement(LovView, { dataSet: options, config: config, onDoubleClick: _this.handleLovViewSelect, onEnterDown: _this.handleLovViewSelect, multiple: _this.multiple, values: _this.getValues() }),
                    onClose: _this.handleLovViewClose,
                    onOk: _this.handleLovViewOk,
                    destroyOnClose: true,
                    style: _extends({
                        width: pxToRem(width),
                        minHeight: pxToRem(400)
                    }, modalProps && modalProps.style)
                }, omit(modalProps, ['style'])));
                if (_this.resetOptions() || noCache) {
                    options.query();
                }
            }
        });
        _this.setFilterText = debounce(action(function (text) {
            var options = _this.options,
                textField = _this.textField;

            _this.filterText = text;
            _this.resetOptions();
            options.setQueryParameter(textField, text);
            if (text) {
                options.query();
            }
        }), 500);
        _this.handleLovViewSelect = function () {
            _this.modal.close();
            _this.handleLovViewOk();
        };
        _this.handleLovViewClose = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            delete _this.modal;
                            _this.focus();

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.handleLovViewOk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
            var options, multiple, records, values;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            options = _this.options, multiple = _this.multiple;
                            records = multiple ? options.selected : new Array().concat(options.current || []);
                            values = records.map(function (record) {
                                return _this.processRecordToObject(record);
                            });

                            _this.setValue(multiple ? values : values[0] || null);

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));
        return _this;
    }

    _createClass(Lov, [{
        key: 'resetOptions',
        value: function resetOptions() {
            var field = this.field,
                record = this.record,
                options = this.options;
            var queryDataSet = options.queryDataSet;

            if (queryDataSet) {
                queryDataSet.reset();
            }
            if (field) {
                var lovPara = toJS(field.get('lovPara')) || {};
                var cascadeMap = field.get('cascadeMap');
                if (cascadeMap && record) {
                    Object.keys(cascadeMap).forEach(function (cascade) {
                        return lovPara[cascade] = record.get(cascadeMap[cascade]);
                    });
                }
                if (!isEqual(lovPara, options.queryParameter)) {
                    options.queryParameter = lovPara;
                    return true;
                } else {
                    options.first();
                }
                if (!options.length || options.isFilteredByQueryFields) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'setText',
        value: function setText(text) {
            _get(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'setText', this).call(this, text);
            if (this.editable) {
                this.setFilterText(text);
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (!this.popup && e.keyCode === KeyCode.DOWN) {
                stopEvent(e);
                this.openModal();
            }
            _get(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            if (this.modal) {
                e.preventDefault();
            }
            _get(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'handleBlur', this).call(this, e);
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            var lovCode = this.lovCode;

            if (lovCode) {
                return lovStore.getConfig(lovCode);
            }
        }
    }, {
        key: 'getPlaceholder',
        value: function getPlaceholder() {
            var placeholder = _get(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'getPlaceholder', this).call(this);
            if (placeholder) {
                return placeholder;
            }
            var config = this.getConfig();
            if (config) {
                return config.placeholder;
            }
        }
    }, {
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(Lov.prototype.__proto__ || Object.getPrototypeOf(Lov.prototype), 'getOtherProps', this).call(this), ['modalProps', 'noCache']);
        }
    }, {
        key: 'getSuffix',
        value: function getSuffix() {
            var suffix = this.props.suffix;

            return this.wrapperSuffix(suffix || React.createElement(Icon, { type: 'search' }), {
                onClick: this.isDisabled() || this.isReadOnly() ? void 0 : this.openModal
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setFilterText.cancel();
            if (this.modal) {
                this.modal.close();
            }
        }
    }, {
        key: 'searchable',
        get: function get() {
            var config = this.getConfig();
            if (config) {
                return config.editableFlag === 'Y';
            }
            return !!this.props.searchable;
        }
    }, {
        key: 'lovCode',
        get: function get() {
            var field = this.field;

            if (field) {
                return field.get('lovCode');
            }
        }
    }, {
        key: 'popup',
        get: function get() {
            return !this.filterText || this.modal ? false : this.statePopup;
        }
    }, {
        key: 'options',
        get: function get() {
            var lovCode = this.lovCode;

            if (lovCode) {
                var ds = lovStore.getLovDataSet(lovCode);
                if (ds) {
                    return ds;
                }
            }
            return new DataSet();
        }
    }]);

    return Lov;
}(Select);
Lov.displayName = 'Lov';
Lov.propTypes = _extends({}, Select.propTypes, {
    modalProps: PropTypes.object,
    noCache: PropTypes.bool
});
Lov.defaultProps = _extends({}, Select.defaultProps, {
    clearButton: true,
    checkValueOnOptionsChange: false
});
tslib_1.__decorate([observable], Lov.prototype, "filterText", void 0);
tslib_1.__decorate([computed], Lov.prototype, "searchable", null);
tslib_1.__decorate([computed], Lov.prototype, "lovCode", null);
tslib_1.__decorate([computed], Lov.prototype, "popup", null);
tslib_1.__decorate([computed], Lov.prototype, "options", null);
tslib_1.__decorate([autobind], Lov.prototype, "handleKeyDown", null);
tslib_1.__decorate([autobind], Lov.prototype, "handleBlur", null);
Lov = tslib_1.__decorate([observer], Lov);
export default Lov;