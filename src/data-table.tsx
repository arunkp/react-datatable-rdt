import React, { useRef, useEffect, useState } from 'react';
import useDebounce from './utils/useDebounce';
import humanizeStr from './utils/humanizeString';
import { Props, columnType } from './utils/PropTypes';
import humanize from './utils/humanizeString';

const ReactDataTableRDT = ({
  tableTitle,
  data,
  selectable = false,
  columns,
  rowsPerPageOptions = [5, 10, 20],
}: Props): JSX.Element => {
  const inputEls = useRef<any>([]);
  const selectAllRef = useRef<any>(null);
  const [tableHeaders, settableHeaders] = useState<columnType[]>();
  const [tableRows, settableRows] = useState<string[]>();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);

  const [isNextButtonDisabled, setisNextButtonDisabled] = useState<
    boolean | undefined
  >(false);

  const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    if (typeof columns === 'string') {
      settableHeaders(
        columns
          .split(' ')
          .map(
            (el): columnType => ({ field: el, fieldHeader: humanizeStr(el) })
          )
      );
    } else {
      settableHeaders(columns);
    }

    if (!columns) {
      generateColumns();
    }
  }, [columns]);

  function paginateRow(arr: any, size: number) {
    let pages = [];
    while (arr.length > 0) {
      pages.push(arr.splice(0, size));
    }
    return pages;
  }

  useEffect(() => {
    generateColumns();
    const paginatedData = paginateRow([...data], pageSize);
    const paginatedDataLength = paginatedData.length;
    settableRows(paginatedData[currentPage]);
    setisNextButtonDisabled(currentPage === paginatedDataLength);
    setisPrevButtonDisabled(currentPage === 0);
  }, [data, currentPage, pageSize]);

  const changeHandler = useDebounce(() => {
    inputEls.current.map((inputEl: HTMLInputElement) => {
      inputEl.checked = selectAllRef.current.checked;
      return inputEl;
    });
  }, 300);

  const generateColumns = () => {
    const result = data && data.flatMap(Object.keys);
    const uniqueKeys = [...new Set(result)];
    settableHeaders(
      uniqueKeys.map((label) => {
        return { field: label, fieldHeader: humanize(label) };
      })
    );
  };

  return (
    <>
      <div>{tableTitle}</div>
      <table data-testid="table">
        <thead data-testid="thead">
          {
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
              {tableHeaders &&
                tableHeaders.map((el, i) => {
                  return (
                    <th key={`col-${el.field}-${i}`} data-testid="col-name">
                      {el.fieldHeader || el.field}
                    </th>
                  );
                })}
            </tr>
          }
        </thead>
        <tbody data-testid="tbody">
          {tableRows &&
            tableRows.map((row: any, i: any) => {
              return (
                <tr key={`row--${i}`} data-testid="table-row">
                  {selectable && (
                    <td>
                      <input
                        ref={(el) => (inputEls.current[i] = el)}
                        type="checkbox"
                        placeholder="select"
                      />
                    </td>
                  )}
                  {tableHeaders &&
                    tableHeaders.map((el, j) => {
                      return (
                        <td key={`row-${el}-${i}-${j}`} data-testid="row-val">
                          {row[el.field] || row[j]}
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <select
        title="Per Page"
        onChange={(e) => {
          setPageSize(Number(e.currentTarget.value));
        }}
      >
        {rowsPerPageOptions.map((rowSize, i) => {
          return (
            <option key={i} value={rowSize}>
              {rowSize}
            </option>
          );
        })}
      </select>
      <button
        disabled={isPrevButtonDisabled}
        title="prev page"
        onClick={() => setcurrentPage(currentPage - 1)}
      >
        Prev Page
      </button>
      <button
        disabled={isNextButtonDisabled}
        title="next page"
        onClick={() => setcurrentPage(currentPage + 1)}
      >
        Next Page
      </button>
    </>
  );
};

export default ReactDataTableRDT;
