import { Component, CSSProperties } from 'react';
import { Size } from '../_util/enum';
export interface AvatarProps {
    /** Shape of avatar, options:`circle`, `square` */
    shape?: 'circle' | 'square';
    size?: Size | number;
    /** Src of image avatar */
    src?: string;
    /** Type of the Icon to be used in avatar */
    icon?: string;
    style?: CSSProperties;
    prefixCls?: string;
    className?: string;
    children?: any;
    alt?: string;
    onError?: () => boolean;
}
export interface AvatarState {
    scale: number;
    isImgExist: boolean;
}
export default class Avatar extends Component<AvatarProps, AvatarState> {
    static displayName: string;
    static defaultProps: {
        shape: string;
        size: Size;
    };
    private avatarChildren;
    constructor(props: AvatarProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: AvatarProps, prevState: AvatarState): void;
    setScale: () => void;
    handleImgLoadError: () => void;
    render(): JSX.Element;
}
