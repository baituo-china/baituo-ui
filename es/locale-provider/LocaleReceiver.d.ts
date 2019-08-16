import { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
export interface LocaleReceiverProps {
    componentName: string;
    defaultLocale: object | Function;
    children: (locale: object, localeCode?: string) => ReactNode;
}
export interface LocaleReceiverContext {
    c7nLocale?: {
        [key: string]: any;
    };
}
export default class LocaleReceiver extends Component<LocaleReceiverProps> {
    static contextTypes: {
        c7nLocale: PropTypes.Requireable<object>;
    };
    context: LocaleReceiverContext;
    getLocale(): any;
    getLocaleCode(): any;
    render(): ReactNode;
}
