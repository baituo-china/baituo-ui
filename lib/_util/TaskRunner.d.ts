/// <reference types="node" />
import Timer = NodeJS.Timer;
export default class TaskRunner {
    id: Timer;
    fn: Function;
    callbacks: (() => any)[];
    constructor(fn?: Function);
    delay(delay: number, fn?: Function, callback?: () => any): Promise<unknown>;
    run(interval: number, fn?: Function, callback?: () => any): Promise<unknown>;
    start(once: boolean, interval: number, fn?: Function, callback?: () => any): Promise<unknown>;
    cancel(): this;
}
