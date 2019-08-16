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
import flatten from 'lodash/flatten';
import TriggerField from '../trigger-field/TriggerField';
import Icon from '../icon';
import Tabs from '../tabs';
import { $l } from '../locale-context';
import IconCategory from './IconCategory';
import { action, computed, observable, runInAction } from 'mobx';
import autobind from '../_util/autobind';
import KeyCode from '../../../es/_util/KeyCode';
import { stopEvent } from '../_util/EventManager';
var categories = Icon.categories;

var categoryKeys = Object.keys(categories);
var COLUMNS = 5;
var IconPicker = function (_TriggerField) {
    _inherits(IconPicker, _TriggerField);

    function IconPicker(props, context) {
        _classCallCheck(this, IconPicker);

        var _this = _possibleConstructorReturn(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, props, context));

        runInAction(function () {
            _this.categoryPages = {};
            _this.activeCategory = categoryKeys[0];
        });
        return _this;
    }

    _createClass(IconPicker, [{
        key: 'getOtherProps',
        value: function getOtherProps() {
            return omit(_get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'getOtherProps', this).call(this), ['pageSize']);
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
                        case KeyCode.RIGHT:
                            stopEvent(e);
                            this.handleKeyDownRight();
                            break;
                        case KeyCode.LEFT:
                            stopEvent(e);
                            this.handleKeyDownLeft();
                            break;
                        case KeyCode.DOWN:
                            stopEvent(e);
                            this.handleKeyDownDown();
                            break;
                        case KeyCode.UP:
                            stopEvent(e);
                            this.handleKeyDownUp();
                            break;
                        case KeyCode.END:
                            stopEvent(e);
                            this.handleKeyDownEnd();
                            break;
                        case KeyCode.HOME:
                            stopEvent(e);
                            this.handleKeyDownHome();
                            break;
                        case KeyCode.PAGE_UP:
                            stopEvent(e);
                            this.handleKeyDownPageUp();
                            break;
                        case KeyCode.PAGE_DOWN:
                            stopEvent(e);
                            this.handleKeyDownPageDown();
                            break;
                        case KeyCode.ENTER:
                            e.preventDefault();
                            this.handleKeyDownEnter();
                            break;
                        case KeyCode.TAB:
                            this.handleKeyDownTab();
                            break;
                        case KeyCode.ESC:
                            e.preventDefault();
                            this.handleKeyDownEsc();
                            break;
                        default:
                    }
                } else if (e.keyCode === KeyCode.SPACE) {
                    e.preventDefault();
                    this.handleKeyDownSpace();
                }
            }
            _get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'handleKeyDown', this).call(this, e);
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
                return this.wrapperPrefix(React.createElement(Icon, { type: value }));
            }
        }
    }, {
        key: 'renderFilteredIcons',
        value: function renderFilteredIcons() {
            var prefixCls = this.prefixCls;

            return React.createElement(
                'div',
                { className: prefixCls + '-single-tab' },
                React.createElement(IconCategory, { paging: false, value: this.selectedIcon, icons: this.filteredIcons, prefixCls: prefixCls, onSelect: this.handleItemSelect })
            );
        }
    }, {
        key: 'renderIconCategories',
        value: function renderIconCategories() {
            var _this2 = this;

            var activeCategory = this.activeCategory,
                prefixCls = this.prefixCls,
                pageSize = this.props.pageSize;
            var TabPane = Tabs.TabPane;

            var tabs = categoryKeys.map(function (category) {
                return React.createElement(
                    TabPane,
                    { key: category, tab: $l('Icon', category), className: prefixCls + '-tab' },
                    React.createElement(IconCategory, { page: _this2.categoryPages[category], pageSize: pageSize, category: category, value: category === activeCategory ? _this2.selectedIcon : undefined, icons: categories[category], prefixCls: prefixCls, onSelect: _this2.handleItemSelect, onPageChange: _this2.handlePageChange })
                );
            });
            return React.createElement(
                'div',
                null,
                React.createElement(
                    Tabs,
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
                return flatten(categoryKeys.map(function (category) {
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
}(TriggerField);
IconPicker.displayName = 'IconPicker';
IconPicker.propTypes = _extends({}, TriggerField.propTypes, {
    pageSize: PropTypes.number
});
IconPicker.defaultProps = _extends({}, TriggerField.defaultProps, {
    suffixCls: 'icon-picker',
    pageSize: 100
});
tslib_1.__decorate([observable], IconPicker.prototype, "activeCategory", void 0);
tslib_1.__decorate([observable], IconPicker.prototype, "selected", void 0);
tslib_1.__decorate([observable], IconPicker.prototype, "categoryPages", void 0);
tslib_1.__decorate([computed], IconPicker.prototype, "selectedIndex", null);
tslib_1.__decorate([computed], IconPicker.prototype, "filteredIcons", null);
tslib_1.__decorate([action], IconPicker.prototype, "setActiveCategory", null);
tslib_1.__decorate([action], IconPicker.prototype, "setCategoryPage", null);
tslib_1.__decorate([autobind], IconPicker.prototype, "handleTabsChange", null);
tslib_1.__decorate([autobind], IconPicker.prototype, "handleItemSelect", null);
tslib_1.__decorate([autobind], IconPicker.prototype, "handlePageChange", null);
tslib_1.__decorate([autobind], IconPicker.prototype, "handleKeyDown", null);
tslib_1.__decorate([action], IconPicker.prototype, "changeSelected", null);
IconPicker = tslib_1.__decorate([observer], IconPicker);
export default IconPicker;