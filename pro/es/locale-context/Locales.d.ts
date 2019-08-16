import { Lang } from './enum';
export default class Locales {
    constructor(locales: any);
    get(lang: Lang): any;
    set(lang: Lang, value: any): void;
}
