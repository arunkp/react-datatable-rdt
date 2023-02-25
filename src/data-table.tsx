import React, { useRef } from 'react';
import useDebounce from './utils/useDebounce';
import { Props, columnType } from '@src/utils/PropTypes';

const ReactDataTableRDT = ({
  tableTitle,
  rows,
  columns,
  selectable = false,
}: Props): JSX.Element => {
  const inputEls = useRef<any>([]);
  const selectAllRef = useRef<any>(null);
  const getColumns = () => {
    return typeof columns === 'string'
      ? columns
          .split(' ')
          .map((el): columnType => ({ field: el, fieldHeader: el }))
      : columns;
  };

  const changeHandler = useDebounce(() => {
    inputEls.current.map((inputEl: HTMLInputElement) => {
      inputEl.checked = selectAllRef.current.checked;
      return inputEl;
    });
  }, 300);

  return (
    <>
      <div>{tableTitle}</div>
      <table data-testid="table">
        <thead data-testid="thead">
          {columns?.length > 0 && (
            <tr>
              {selectable && (
                <th>
                  <input
                    onChange={changeHandler}
                    type="checkbox"
                    placeholder="select"
                    ref={selectAllRef}
                  />
                </th>
              )}
              {getColumns().map((el, i) => {
                return (
                  <th key={`col-${el.field}-${i}`} data-testid="col-name">
                    {el.field}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody data-testid="tbody">
          {columns?.length > 0 &&
            rows.map((row, i) => {
              return (
                <tr key={`row-${row}-${i}`} data-testid="table-row">
                  {selectable && (
                    <td>
                      <input
                        ref={(el) => (inputEls.current[i] = el)}
                        type="checkbox"
                        placeholder="select"
                      />
                    </td>
                  )}
                  {getColumns().map((el, j) => {
                    return (
                      <td key={`row-${el}-${i}-${j}`} data-testid="row-val">
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
