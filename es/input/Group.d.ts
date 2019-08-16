import { CSSProperties, StatelessComponent } from 'react';
import { Size } from '../_util/enum';
export interface GroupProps {
    className?: string;
    size?: Size;
    children?: any;
    style?: CSSProperties;
    prefixCls?: string;
    compact?: boolean;
}
declare const Group: StatelessComponent<GroupProps>;
export default Group;
