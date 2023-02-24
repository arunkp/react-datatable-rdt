import React, { ReactNode } from 'react';

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
  columns: columnType[];
};

const ReactDataTableRDT = ({
  tableTitle,
  rows,
  columns,
}: Props): JSX.Element => {
  return (
    <>
      <div>{tableTitle}</div>
      <table>
        <thead>
          <tr>
            {columns.map((el) => {
              return <th>{el.field}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr>
                {columns.map((el) => {
                  return <td>{row[el.field]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ReactDataTableRDT;
