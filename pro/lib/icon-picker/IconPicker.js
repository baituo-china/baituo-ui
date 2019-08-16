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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _TriggerField2 = require('../trigger-field/TriggerField');

var _TriggerField3 = _interopRequireDefault(_TriggerField2);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tabs = require('../tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _localeContext = require('../locale-context');

var _IconCategory = require('./IconCategory');

var _IconCategory2 = _interopRequireDefault(_IconCategory);

var _mobx = require('mobx');

var _autobind = require('../_util/autobind');

var _autobind2 = _interopRequireDefault(_autobind);

var _KeyCode = require('../../../lib/_util/KeyCode');

var _KeyCode2 = _interopRequireDefault(_KeyCode);

var _EventManager = require('../_util/EventManager');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var categories = _icon2['default'].categories;

var categoryKeys = Object.keys(categories);
var COLUMNS = 5;
var IconPicker = function (_TriggerField) {
    (0, _inherits3['default'])(IconPicker, _TriggerField);

    function IconPicker(props, context) {
        (0, _classCallCheck3['default'])(this, IconPicker);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, props, context));

        (0, _mobx.runInAction)(function () {
            _this.categoryPages = {};
            _this.activeCategory = categoryKeys[0];
        });
        return _this;
    }

    (0, _createClass3['default'])(IconPicker, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return (0, _omit2['default'])((0, _get3['default'])(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'getOtherProps', this).call(this), ['pageSize']);
        }
    }, {
        key: 'setActiveCategory',
        value: function setActiveCategory(category) {
            this.activeCategory = category;
            var page = this.categoryPages[category];
            this.changeSelected(categories[category][(page - 1) * this.props.pageSize]);
        }
    }, {
        key: 'setCategoryPage',
        value: function setCategoryPage(page, category) {
            this.categoryPages[category] = page;
            this.changeSelected(categories[category][(page - 1) * this.props.pageSize]);
        }
    }, {
        key: 'handleTabsChange',
        value: function handleTabsChange(category) {
            this.setActiveCategory(category);
        }
    }, {
        key: 'handleItemSelect',
        value: function handleItemSelect(icon) {
            this.choose(icon);
        }
    }, {
        key: 'handlePageChange',
        value: function handlePageChange(page, category) {
            this.setCategoryPage(page, category);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            if (!this.isDisabled() && !this.isReadOnly()) {
                if (this.popup) {
                    switch (e.keyCode) {
                        case _KeyCode2['default'].RIGHT:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownRight();
                            break;
                        case _KeyCode2['default'].LEFT:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownLeft();
                            break;
                        case _KeyCode2['default'].DOWN:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownDown();
                            break;
                        case _KeyCode2['default'].UP:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownUp();
                            break;
                        case _KeyCode2['default'].END:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownEnd();
                            break;
                        case _KeyCode2['default'].HOME:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownHome();
                            break;
                        case _KeyCode2['default'].PAGE_UP:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownPageUp();
                            break;
                        case _KeyCode2['default'].PAGE_DOWN:
                            (0, _EventManager.stopEvent)(e);
                            this.handleKeyDownPageDown();
                            break;
                        case _KeyCode2['default'].ENTER:
                            e.preventDefault();
                            this.handleKeyDownEnter();
                            break;
                        case _KeyCode2['default'].TAB:
                            this.handleKeyDownTab();
                            break;
                        case _KeyCode2['default'].ESC:
                            e.preventDefault();
                            this.handleKeyDownEsc();
                            break;
                        default:
                    }
                } else if (e.keyCode === _KeyCode2['default'].SPACE) {
                    e.preventDefault();
                    this.handleKeyDownSpace();
                }
            }
            (0, _get3['default'])(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'handleKeyDown', this).call(this, e);
        }
    }, {
        key: 'handleKeyDownHome',
        value: function handleKeyDownHome() {
            var activeCategory = this.activeCategory,
                categoryPages = this.categoryPages,
                pageSize = this.props.pageSize;

            var category = categories[activeCategory];
            var page = categoryPages[activeCategory] || 1;
            this.changeSelected(category[(page - 1) * pageSize]);
        }
    }, {
        key: 'handleKeyDownEnd',
        value: function handleKeyDownEnd() {
            var activeCategory = this.activeCategory,
                categoryPages = this.categoryPages,
                pageSize = this.props.pageSize;

            var category = categories[activeCategory];
            var page = categoryPages[activeCategory] || 1;
            this.changeSelected(category[page * pageSize - 1] || category[category.length - 1]);
        }
    }, {
        key: 'handleKeyDownLeftOrRight',
        value: function handleKeyDownLeftOrRight(isLeft) {
            var activeCategory = this.activeCategory,
                selectedIndex = this.selectedIndex,
                categoryPages = this.categoryPages,
                pageSize = this.props.pageSize;

            var step = isLeft ? -1 : 1;
            var category = categories[activeCategory];
            var index = selectedIndex;
            if (index % COLUMNS === (isLeft ? 0 : COLUMNS - 1) || !isLeft && index === category.length - 1) {
                var activeCategoryIndex = categoryKeys.indexOf(activeCategory);
                if (activeCategoryIndex !== (isLeft ? 0 : categoryKeys.length - 1)) {
                    var newTabIndex = activeCategoryIndex + step;
                    var newKey = categoryKeys[newTabIndex];
                    this.setActiveCategory(newKey);
                    var page = categoryPages[activeCategory] || 1;
                    category = categories[newKey];
                    var newPage = categoryPages[newKey] || 1;
                    index += (newPage - page) * pageSize;
                    if (!category[index]) {
                        index = isLeft ? category.length - 1 : (newPage - 1) * pageSize;
                    }
                }
            } else {
                index += step;
            }
            if (category[index]) {
                this.changeSelected(category[index]);
            }
        }
    }, {
        key: 'handleKeyDownUpOrDown',
        value: function handleKeyDownUpOrDown(isUP) {
            var activeCategory = this.activeCategory,
                selectedIndex = this.selectedIndex,
                categoryPages = this.categoryPages,
                pageSize = this.props.pageSize;

            var step = isUP ? -1 : 1;
            var category = categories[activeCategory];
            var index = selectedIndex;
            var page = categoryPages[activeCategory] || 1;
            if (isUP ? index < (page - 1) * pageSize + COLUMNS && page > 1 : index > page * pageSize - COLUMNS && page < Math.ceil(category.length / pageSize)) {
                this.setCategoryPage(page + step, activeCategory);
            }
            index += step * COLUMNS;
            if (category[index]) {
                this.changeSelected(category[index]);
            }
        }
    }, {
        key: 'handleKeyDownLeft',
        value: function handleKeyDownLeft() {
            this.handleKeyDownLeftOrRight(true);
        }
    }, {
        key: 'handleKeyDownRight',
        value: function handleKeyDownRight() {
            this.handleKeyDownLeftOrRight(false);
        }
    }, {
        key: 'handleKeyDownUp',
        value: function handleKeyDownUp() {
            this.handleKeyDownUpOrDown(true);
        }
    }, {
        key: 'handleKeyDownDown',
        value: function handleKeyDownDown() {
            if (this.popup) {
                this.handleKeyDownUpOrDown(false);
            } else {
                this.expand();
            }
        }
    }, {
        key: 'handleKeyDownPageUp',
        value: function handleKeyDownPageUp() {
            var activeCategory = this.activeCategory,
                selectedIndex = this.selectedIndex,
                categoryPages = this.categoryPages,
                pageSize = this.props.pageSize;

            var page = categoryPages[activeCategory] || 1;
            var category = categories[activeCategory];
            if (page > 1) {
                this.setCategoryPage(page - 1, activeCategory);
                this.changeSelected(category[selectedIndex - pageSize]);
            }
        }
    }, {
        key: 'handleKeyDownPageDown',
        value: function handleKeyDownPageDown() {
            var activeCategory = this.activeCategory,
                selectedIndex = this.selectedIndex,
                categoryPages = this.categoryPages,
                pageSize = this.props.pageSize;

            var page = categoryPages[activeCategory] || 1;
            var category = categories[activeCategory];
            if (page < Math.ceil(category.length / pageSize)) {
                this.setCategoryPage(page + 1, activeCategory);
                this.changeSelected(category[selectedIndex + pageSize] || category[category.length - 1]);
            }
        }
    }, {
        key: 'handleKeyDownEnter',
        value: function handleKeyDownEnter() {
            this.choose(this.selectedIcon);
        }
    }, {
        key: 'handleKeyDownEsc',
        value: function handleKeyDownEsc() {
            this.collapse();
        }
    }, {
        key: 'handleKeyDownTab',
        value: function handleKeyDownTab() {
            this.collapse();
        }
    }, {
        key: 'handleKeyDownSpace',
        value: function handleKeyDownSpace() {
            this.expand();
        }
    }, {
        key: 'changeSelected',
        value: function changeSelected(selected) {
            this.selected = selected;
        }
    }, {
        key: 'choose',
        value: function choose(icon) {
            this.addValue(icon);
            this.changeSelected(icon);
            if (!this.multiple) {
                this.collapse();
            }
        }
    }, {
        key: 'syncValueOnBlur',
        value: function syncValueOnBlur(value) {
            if (this.filteredIcons.indexOf(value) !== -1) {
                this.choose(value);
            } else {
                this.setText(void 0);
            }
        }
    }, {
        key: 'handlePopupAnimateAppear',
        value: function handlePopupAnimateAppear() {}
    }, {
        key: 'handlePopupAnimateEnd',
        value: function handlePopupAnimateEnd() {}
    }, {
        key: 'getPopupStyleFromAlign',
        value: function getPopupStyleFromAlign() {
            return undefined;
        }
    }, {
        key: 'getTriggerIconFont',
        value: function getTriggerIconFont() {
            return 'developer_board';
        }
    }, {
        key: 'getPopupContent',
        value: function getPopupContent() {
            var text = this.text;

            if (text) {
                return this.renderFilteredIcons();
            } else {
                return this.renderIconCategories();
            }
        }
    }, {
        key: 'getPrefix',
        value: function getPrefix() {
            var value = this.getValue();
            if (value) {
                return this.wrapperPrefix(_react2['default'].createElement(_icon2['default'], { type: value }));
            }
        }
    }, {
        key: 'renderFilteredIcons',
        value: function renderFilteredIcons() {
            var prefixCls = this.prefixCls;

            return _react2['default'].createElement(
                'div',
                { className: prefixCls + '-single-tab' },
                _react2['default'].createElement(_IconCategory2['default'], { paging: false, value: this.selectedIcon, icons: this.filteredIcons, prefixCls: prefixCls, onSelect: this.handleItemSelect })
            );
        }
    }, {
        key: 'renderIconCategories',
        value: function renderIconCategories() {
            var _this2 = this;

            var activeCategory = this.activeCategory,
                prefixCls = this.prefixCls,
                pageSize = this.props.pageSize;
            var TabPane = _tabs2['default'].TabPane;

            var tabs = categoryKeys.map(function (category) {
                return _react2['default'].createElement(
                    TabPane,
                    { key: category, tab: (0, _localeContext.$l)('Icon', category), className: prefixCls + '-tab' },
                    _react2['default'].createElement(_IconCategory2['default'], { page: _this2.categoryPages[category], pageSize: pageSize, category: category, value: category === activeCategory ? _this2.selectedIcon : undefined, icons: categories[category], prefixCls: prefixCls, onSelect: _this2.handleItemSelect, onPageChange: _this2.handlePageChange })
                );
            });
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    _tabs2['default'],
                    { onChange: this.handleTabsChange, activeKey: activeCategory },
                    tabs
                )
            );
        }
    }, {
        key: 'selectedIndex',
        get: function get() {
            return categories[this.activeCategory].indexOf(this.selectedIcon);
        }
    }, {
        key: 'filteredIcons',
        get: function get() {
            var text = this.text;

            if (text) {
                return (0, _flatten2['default'])(categoryKeys.map(function (category) {
                    return categories[category].filter(function (icon) {
                        return icon.startsWith(text);
                    });
                }));
            }
            return [];
        }
    }, {
        key: 'selectedIcon',
        get: function get() {
            return this.selected || this.getValue() || categories[this.activeCategory][0];
        }
    }]);
    return IconPicker;
}(_TriggerField3['default']);
IconPicker.displayName = 'IconPicker';
IconPicker.propTypes = (0, _extends3['default'])({}, _TriggerField3['default'].propTypes, {
    pageSize: _propTypes2['default'].number
});
IconPicker.defaultProps = (0, _extends3['default'])({}, _TriggerField3['default'].defaultProps, {
    suffixCls: 'icon-picker',
    pageSize: 100
});
tslib_1.__decorate([_mobx.observable], IconPicker.prototype, "activeCategory", void 0);
tslib_1.__decorate([_mobx.observable], IconPicker.prototype, "selected", void 0);
tslib_1.__decorate([_mobx.observable], IconPicker.prototype, "categoryPages", void 0);
tslib_1.__decorate([_mobx.computed], IconPicker.prototype, "selectedIndex", null);
tslib_1.__decorate([_mobx.computed], IconPicker.prototype, "filteredIcons", null);
tslib_1.__decorate([_mobx.action], IconPicker.prototype, "setActiveCategory", null);
tslib_1.__decorate([_mobx.action], IconPicker.prototype, "setCategoryPage", null);
tslib_1.__decorate([_autobind2['default']], IconPicker.prototype, "handleTabsChange", null);
tslib_1.__decorate([_autobind2['default']], IconPicker.prototype, "handleItemSelect", null);
tslib_1.__decorate([_autobind2['default']], IconPicker.prototype, "handlePageChange", null);
tslib_1.__decorate([_autobind2['default']], IconPicker.prototype, "handleKeyDown", null);
tslib_1.__decorate([_mobx.action], IconPicker.prototype, "changeSelected", null);
IconPicker = tslib_1.__decorate([_mobxReact.observer], IconPicker);
exports['default'] = IconPicker;
module.exports = exports['default'];