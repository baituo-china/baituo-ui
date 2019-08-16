import localeContext from './LocaleContext';
import formatReactTemplate from '../_util/formatReactTemplate';
export function $l(component, key, injectionOptions) {
    var locale = localeContext.get(component, key);
    if (injectionOptions) {
        return formatReactTemplate(locale, injectionOptions);
    }
    return locale;
}
export default localeContext;