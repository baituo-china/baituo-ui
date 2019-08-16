import { ComponentType } from 'react';
export declare type AsyncCmpLoadingFunction = () => Promise<{
    default: ComponentType;
}>;
declare const asyncComponent: (importComponent: AsyncCmpLoadingFunction) => any;
export default asyncComponent;
