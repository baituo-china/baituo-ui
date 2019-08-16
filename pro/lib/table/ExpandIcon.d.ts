import { Component } from 'react';
import PropTypes from 'prop-types';
import { ElementProps } from '../core/ViewComponent';
export interface ExpandIconProps extends ElementProps {
    expandable?: boolean;
    expanded?: boolean;
    onChange: (e: any) => void;
}
export default class ExpandIcon extends Component<ExpandIconProps> {
    static propTypes: {
        expandable: PropTypes.Requireable<boolean>;
        expanded: PropTypes.Requireable<boolean>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    shouldComponentUpdate(nextProps: any): boolean;
    handleClick: (e: any) => void;
    render(): JSX.Element;
}
