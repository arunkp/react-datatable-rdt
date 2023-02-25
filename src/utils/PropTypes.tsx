import { ReactNode } from 'react';

export declare type rowType = {
  [key: string]: string;
};

export declare type columnType = {
  field: string;
  fieldHeader: string;
};

export declare type Props = {
  /*
    @tableTitle adds some text above the table, it could be a any HTML/JSX tag or a string
    */
  tableTitle?: ReactNode | string;

  /*
    @rows accepts a array of objects with keys same as column field values as data
    IMPORTANT: use exactly same keys in the objects as mentioned as field value of columns.
    */
  rows: rowType[];

  /*
    @columns accepts a array of objects, every object must have field and fieldHeader
    IMPORTANT: The field value will be used to map the rows.
    */
  columns: string | columnType[];

  /*
    @selectable makes all the rows selectable with a visible checkbox
    */
  selectable?: boolean;
};
