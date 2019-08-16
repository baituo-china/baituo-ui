import { ReactNode } from 'react';
import Record from '../data-set/Record';
import { Select, SelectProps } from '../select/Select';
export interface TransferListProps extends SelectProps {
    header?: ReactNode;
    selected: Record[];
    footer?: (options: Record[]) => ReactNode;
    onSelect: (e: any) => void;
    onSelectAll: (value: any) => void;
}
export default class TransferList extends Select<TransferListProps> {
    readonly popup: boolean;
    readonly header: ReactNode;
    readonly footer: ReactNode;
    getOtherProps(): Pick<Pick<Pick<Pick<Pick<Pick<any, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>, string | number | symbol>;
    getObservableProps(props: any, context: any): {
        header: any;
        footer: any;
        children: any;
        options: any;
        combo: any;
        primitiveValue: any;
        record: any;
        dataSet: any;
        dataIndex: any;
        value: any;
    };
    getMenuPrefixCls(): string;
    handleSelectAllChange(value: any): void;
    handleClear(): void;
    getHeaderSelected(): JSX.Element | undefined;
    getSearchField(): ReactNode;
    renderBody(): ReactNode;
    getClassName(): string | undefined;
    removeLastValue(): void;
    handleBlur(e: any): void;
    render(): JSX.Element;
}
