import { CSSProperties, ReactNode } from 'react';
export interface DividerProps {
    prefixCls?: string;
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right' | '';
    className?: string;
    children?: ReactNode;
    dashed?: boolean;
    style?: CSSProperties;
}
export default function Divider({ prefixCls: customizePrefixCls, type, orientation, className, children, dashed, ...restProps }: DividerProps): JSX.Element;
