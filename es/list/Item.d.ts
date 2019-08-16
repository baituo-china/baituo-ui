import { Component, CSSProperties, ReactNode, SFC } from 'react';
import PropTypes from 'prop-types';
import { ListGridType } from './index';
export interface ListItemProps {
    className?: string;
    children?: ReactNode;
    prefixCls?: string;
    style?: CSSProperties;
    extra?: ReactNode;
    actions?: Array<ReactNode>;
    grid?: ListGridType;
}
export interface ListItemMetaProps {
    avatar?: ReactNode;
    className?: string;
    children?: ReactNode;
    description?: ReactNode;
    prefixCls?: string;
    style?: CSSProperties;
    title?: ReactNode;
}
export declare const Meta: SFC<ListItemMetaProps>;
export default class Item extends Component<ListItemProps, any> {
    static displayName: string;
    static Meta: typeof Meta;
    static propTypes: {
        column: PropTypes.Requireable<string | number>;
        xs: PropTypes.Requireable<string | number>;
        sm: PropTypes.Requireable<string | number>;
        md: PropTypes.Requireable<string | number>;
        lg: PropTypes.Requireable<string | number>;
        xl: PropTypes.Requireable<string | number>;
        xxl: PropTypes.Requireable<string | number>;
    };
    static contextTypes: {
        grid: PropTypes.Requireable<any>;
    };
    render(): JSX.Element;
}
