import { Key, ReactElement, ReactNode } from 'react';
export declare function toArrayChildren(children: ReactNode): ReactElement<any>[];
export declare function findChildInChildrenByKey(children: ReactElement<any>[], key: Key | null): ReactElement<any> | undefined;
export declare function findShownChildInChildrenByKey(children: ReactElement<any>[], key: Key | null, hiddenProp: string): ReactElement<any> | undefined;
export declare function isSameChildren(c1: ReactElement<any>[], c2: ReactElement<any>[], hiddenProp?: string): boolean;
export declare function mergeChildren(prev: ReactElement<any>[], next: ReactElement<any>[]): ReactElement<any>[];
