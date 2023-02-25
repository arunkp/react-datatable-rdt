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
      <table data-testid="table">
        <thead data-testid="thead">
          {columns.length > 0 && (
            <tr>
              {columns.map((el, i) => {
                return (
                  <th key={i} data-testid="col-name">
                    {el.field}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody data-testid="tbody">
          {rows.map((row, i) => {
            return (
              <tr key={i} data-testid="table-row">
                {columns.map((el, j) => {
                  return (
                    <td key={`${i}.${j}`} data-testid="row-val">
                      {row[el.field]}
                    </td>
                  );
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
