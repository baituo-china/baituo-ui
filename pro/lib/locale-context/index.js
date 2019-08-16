'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$l = $l;

var _LocaleContext = require('./LocaleContext');

var _LocaleContext2 = _interopRequireDefault(_LocaleContext);

var _formatReactTemplate = require('../_util/formatReactTemplate');

var _formatReactTemplate2 = _interopRequireDefault(_formatReactTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function $l(component, key, injectionOptions) {
    var locale = _LocaleContext2['default'].get(component, key);
    if (injectionOptions) {
        return (0, _formatReactTemplate2['default'])(locale, injectionOptions);
    }
    return locale;
}
exports['default'] = _LocaleContext2['default'];