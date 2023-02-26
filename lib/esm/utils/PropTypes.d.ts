import { ReactNode } from 'react';
export declare type rowType = {
    [key: string]: string | number | null;
};
export declare type columnType = {
    field: string;
    fieldHeader: string;
};
export declare type Props = {
    tableTitle?: ReactNode | string;
    columns?: string | columnType[];
    selectable?: boolean;
    data: rowType[] | (string | number | null)[][];
    useObjectKeysForColumnNames?: boolean;
    pageSize?: number;
    rowsPerPageOptions?: number[];
};
