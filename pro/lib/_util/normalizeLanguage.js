'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = normalizeLanguage;
function normalizeLanguage(language) {
    return language && language.replace('_', '-').toLowerCase();
}
module.exports = exports['default'];