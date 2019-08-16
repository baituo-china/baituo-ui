import { Component, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
declare class SubMenu extends Component<any, any> {
    static contextTypes: {
        menuTheme: PropTypes.Requireable<string>;
    };
    private subMenu;
    onKeyDown: MouseEventHandler<HTMLElement>;
    saveSubMenu: (subMenu: any) => void;
    render(): JSX.Element;
}
export default SubMenu;
