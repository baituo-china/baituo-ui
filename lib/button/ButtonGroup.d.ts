import { CSSProperties, SFC } from 'react';
import { Size } from '../_util/enum';
export interface ButtonGroupProps {
    size?: Size;
    style?: CSSProperties;
    className?: string;
    prefixCls?: string;
}
declare const ButtonGroup: SFC<ButtonGroupProps>;
export default ButtonGroup;
