import { ComponentClass, HTMLAttributes } from 'react';
import { SiderProps } from './Sider';
export interface BasicProps extends HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    displayName: string;
    hasSider?: boolean;
}
export declare type GeneratorProps = {
    suffixCls: string;
    displayName: string;
};
declare const Layout: ComponentClass<BasicProps> & {
    Header: ComponentClass<BasicProps>;
    Footer: ComponentClass<BasicProps>;
    Content: ComponentClass<BasicProps>;
    Sider: ComponentClass<SiderProps>;
};
export default Layout;
