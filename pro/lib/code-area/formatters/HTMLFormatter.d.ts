import { Options } from 'prettier';
import { CodeAreaFormatter } from '../CodeAreaFormatter';
export declare class HTMLFormatter implements CodeAreaFormatter {
    static defaultOptions: Options;
    getFormatted(rawText: string, options?: Options): string;
    getRaw(formattedText: string): string;
}
declare const _default: HTMLFormatter;
export default _default;
