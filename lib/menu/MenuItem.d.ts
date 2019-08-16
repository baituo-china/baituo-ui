import { Component, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
declare class MenuItem extends Component<any, any> {
    static contextTypes: {
        inlineCollapsed: PropTypes.Requireable<boolean>;
    };
    static isMenuItem: number;
    private menuItem;
    onKeyDown: MouseEventHandler<HTMLElement>;
    saveMenuItem: (menuItem: any) => void;
    render(): JSX.Element;
}
export default MenuItem;
