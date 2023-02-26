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
  /*
    @tableTitle adds some text above the table, it could be a any HTML/JSX tag or a string
    Optional
    */
  tableTitle?: ReactNode | string;

  /*
    @columns accepts a array of objects, every object must have field and fieldHeader
    IMPORTANT: The field value will be used to map the rows.
    */
  columns?: string | columnType[];

  /*
    @selectable makes all the rows selectable with a visible checkbox
    default: false;
    Optional
    */
  selectable?: boolean;

  /*
  @getSelectedRow is a function which gives all the selected rows by the user.
  */
  getSelectedRow?: (selectedRows: dataType[]) => void;
};

interface PropsWithData extends CommonProps {
  /*
    @data Raw data to be filled instead of rows and columns
    Optional
  */
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
