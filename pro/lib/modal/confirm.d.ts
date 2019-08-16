import { ModalProps } from './Modal';
export default function confirm(props: (ModalProps & {
    iconType?: string;
    type?: string;
    children: any;
}) | string): Promise<unknown>;
