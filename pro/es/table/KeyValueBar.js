import _defineProperty from 'babel-runtime/helpers/defineProperty';
import React, { isValidElement } from 'react';
import Icon from '../icon';
import classNames from 'classnames';
import { $l } from '../locale-context';
var KeyValueBar = function KeyValueBar(props) {
    var handleCloseBtnClick = function handleCloseBtnClick(key) {
        var onCloseBtnClick = props.onCloseBtnClick;

        if (onCloseBtnClick) {
            onCloseBtnClick(key);
        }
    };
    function renderItems(items) {
        if (items.length === 0) {
            return null;
        }
        return items.map(function (item) {
            var isReactNode = false;
            var key = item.key,
                value = item.value;

            if (isValidElement(value) || typeof value === 'string' || typeof value === 'number') {
                isReactNode = true; // FIXME: 暂时没想到更好的方法去判断value能否渲染
            }
            return React.createElement(
                'div',
                { key: key, className: 'pair-container' },
                React.createElement(
                    'div',
                    { className: 'd-flex' },
                    React.createElement(
                        'span',
                        null,
                        key,
                        ': ',
                        isReactNode ? value : '不支持的值'
                    ),
                    React.createElement(Icon, { type: 'close', onClick: function onClick() {
                            return handleCloseBtnClick(key);
                        } })
                )
            );
        });
    }
    function getClassName() {
        var prefixCls = props.prefixCls;

        return classNames(_defineProperty({}, prefixCls + '-advanced-query-bar-key-value-bar', !!prefixCls));
    }
    return React.createElement(
        'div',
        { className: getClassName() },
        React.createElement(
            'span',
            null,
            $l('Table', 'advanced_query_conditions'),
            ': '
        ),
        renderItems(props.items)
    );
};
export default KeyValueBar;