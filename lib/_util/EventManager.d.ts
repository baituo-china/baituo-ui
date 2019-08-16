declare type handler = [Function, boolean];
export default class EventManager {
    events: {
        [eventName: string]: handler[];
    };
    el?: any;
    constructor(el?: any);
    addEventListener(eventName: string, fn: Function, useCapture?: boolean): EventManager;
    removeEventListener(eventName: string, fn?: Function, useCapture?: boolean): EventManager;
    fireEvent(eventName: string, ...rest: any[]): Promise<boolean>;
    clear(): EventManager;
}
export declare function preventDefault(e: any): void;
export declare function stopPropagation(e: any): void;
export declare function stopEvent(e: any): void;
export {};
