'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getConfig = getConfig;
exports.getPrefixCls = getPrefixCls;
exports.getProPrefixCls = getProPrefixCls;
exports['default'] = configure;

var _mobx = require('mobx');

var globalConfig = _mobx.observable.map([['prefixCls', 'c7n'], ['proPrefixCls', 'c7n-pro'], ['ripple', true], ['lookupUrl', function (code) {
    return '/common/code/' + code + '/';
}], ['lookupAxiosMethod', 'post'], ['lovDefineUrl', function (code) {
    return '/sys/lov/lov_define?code=' + code;
}], ['lovQueryUrl', function (code) {
    return '/common/lov/dataset/' + code;
}], ['dataKey', 'rows'], ['totalKey', 'total'], ['labelLayout', 'horizontal'], ['queryBar', 'normal'], ['tableBorder', true], ['tableHighLightRow', true], ['tableRowHeight', 30], ['tableColumnResizable', true], ['modalSectionBorder', true], ['modalOkFirst', true]]);
function getConfig(key) {
    // FIXME: observable.map把构建map时传入的key类型和value类型分别做了union，
    // 丢失了一一对应的映射关系，导致函数调用者无法使用union后的返回值类型，因此需要指定本函数返回值为any
    return globalConfig.get(key);
}
function getPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) {
        return customizePrefixCls;
    }
    return getConfig('prefixCls') + '-' + suffixCls;
}
function getProPrefixCls(suffixCls, customizePrefixCls) {
    if (customizePrefixCls) {
        return customizePrefixCls;
    }
    return getConfig('proPrefixCls') + '-' + suffixCls;
}
function configure(config) {
    (0, _mobx.runInAction)(function () {
        Object.keys(config).forEach(function (key) {
            return globalConfig.set(key, config[key]);
        });
    });
}