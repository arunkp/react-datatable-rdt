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
    columns?: string | columnType[];
    selectable?: boolean;
    data: rowType[] | string[][];
    useObjectKeysForColumnNames?: boolean;
    pageSize?: number;
    rowsPerPageOptions?: number[];
    isCSV?: boolean;
};
