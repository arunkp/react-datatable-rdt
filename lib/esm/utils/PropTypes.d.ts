import { ReactNode } from 'react';
export declare type rowType = {
    [key: string]: string | number | null;
};
export declare type dataType = rowType | (string | number | null)[];
export declare type columnType = {
    field: string;
    fieldHeader: string;
};
export declare type PaginationType = 'server' | 'client';
export declare type CommonProps = {
    tableTitle?: ReactNode | string;
    columns?: string | columnType[] | undefined;
    selectable?: boolean;
    getSelectedRow?: (selectedRows: dataType[]) => void;
};
interface PropsWithData extends CommonProps {
    data: dataType[];
    perPageSize?: number;
    paginated?: never;
}
interface PropsWithPagination extends CommonProps {
    paginated: {
        data: dataType[];
        total: number;
        skip: number;
        take: number;
    };
    data?: never;
    perPageSize?: never;
}
export declare type Props = PropsWithData | PropsWithPagination;
export {};
