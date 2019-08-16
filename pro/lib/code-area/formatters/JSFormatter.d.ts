import { Options } from 'prettier';
import { CodeAreaFormatter } from '../CodeAreaFormatter';
export declare class JSFormatter implements CodeAreaFormatter {
    static defaultOptions: Options;
    getFormatted(rawText: string, options?: Options): string;
    getRaw(formattedText: string): string;
}
declare const _default: JSFormatter;
export default _default;
