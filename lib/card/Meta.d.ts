import { CSSProperties, ReactNode, SFC } from 'react';
export interface CardMetaProps {
    prefixCls?: string;
    style?: CSSProperties;
    className?: string;
    avatar?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
}
declare const Meta: SFC<CardMetaProps>;
export default Meta;
