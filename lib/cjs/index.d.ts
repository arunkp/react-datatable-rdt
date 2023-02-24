import { ReactNode } from 'react';
export declare type rowType = {
    [key: string]: string;
};
export declare type columnType = {
    field: string;
    fieldHeader: string;
};
export declare type Props = {
    tableTitle?: ReactNode | string;
    rows: rowType[];
    columns: columnType[];
};
declare const ReactDataTableRDT: ({ tableTitle, rows, columns, }: Props) => JSX.Element;
export default ReactDataTableRDT;
