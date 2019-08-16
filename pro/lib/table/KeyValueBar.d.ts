import { FC } from 'react';
export interface KeyValuePair {
    key: string;
    value: any;
}
export interface KeyValueBarProps {
    prefixCls?: string;
    items: KeyValuePair[];
    onCloseBtnClick?: (key: string) => void;
}
declare const KeyValueBar: FC<KeyValueBarProps>;
export default KeyValueBar;
