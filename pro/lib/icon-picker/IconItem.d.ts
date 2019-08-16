import { PureComponent } from 'react';
import PropTypes from 'prop-types';
export interface IconItemProps {
    prefixCls?: string;
    type: string;
    active: boolean;
    onSelect: (type: string) => void;
}
export default class IconItem extends PureComponent<IconItemProps> {
    static displayName: string;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        active: PropTypes.Validator<boolean>;
        type: PropTypes.Validator<string>;
        onSelect: PropTypes.Validator<(...args: any[]) => any>;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
