import { Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ModalLocale } from '../modal/locale';
export interface Locale {
    locale: string;
    Pagination?: Object;
    DatePicker?: Object;
    TimePicker?: Object;
    Calendar?: Object;
    Table?: Object;
    Modal?: ModalLocale;
    Popconfirm?: Object;
    Transfer?: Object;
    Select?: Object;
    Upload?: Object;
}
export interface LocaleProviderProps {
    locale: Locale;
    children?: ReactElement<any>;
}
export default class LocaleProvider extends Component<LocaleProviderProps, any> {
    static propTypes: {
        locale: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        locale: {};
    };
    static childContextTypes: {
        c7nLocale: PropTypes.Requireable<object>;
    };
    getChildContext(): {
        c7nLocale: {
            exist: boolean;
            locale: string;
            Pagination?: Object | undefined;
            DatePicker?: Object | undefined;
            TimePicker?: Object | undefined;
            Calendar?: Object | undefined;
            Table?: Object | undefined;
            Modal?: ModalLocale | undefined;
            Popconfirm?: Object | undefined;
            Transfer?: Object | undefined;
            Select?: Object | undefined;
            Upload?: Object | undefined;
        };
    };
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: LocaleProviderProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> | (ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> & string) | (ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> & number) | (ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> & false) | (ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> & true) | (ReactElement<any, string | ((props: any) => ReactElement<any, string | any | (new (props: any) => Component<any, any, any>)> | null) | (new (props: any) => Component<any, any, any>)> & import("react").ReactPortal) | undefined;
}
