import { Locale } from './locale';
import { Supports } from './supports';
export declare class LocaleContext {
    locale: Locale;
    supports: Supports;
    constructor();
    setLocale(locale: Locale): void;
    setSupports(supports: Supports): void;
    get(component: string, key: string): any;
}
declare const _default: LocaleContext;
export default _default;
