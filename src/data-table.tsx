import React, { useEffect, useState, ChangeEvent } from 'react';
// import useDebounce from './utils/useDebounce';
import humanizeStr from './utils/humanizeString';
import { Props, columnType, dataType, rowType } from './utils/PropTypes';
import humanize from './utils/humanizeString';

const ReactDataTableRDT = ({
  tableTitle,
  data,
  selectable = false,
  columns,
  rowsPerPageOptions = [5, 10, 20],
  getSelectedRow,
}: // paginationMode,
Props): JSX.Element => {
  const [tableHeaders, settableHeaders] = useState<columnType[]>();
  const [tableRows, settableRows] = useState<dataType[]>();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pages, setpages] = useState<number | undefined>();
  const [selectAllChecked, setselectAllChecked] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<dataType[]>([]);
  const [isNextButtonDisabled, setisNextButtonDisabled] = useState<
    boolean | undefined
  >(false);

  const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    const generateColumns = () => {
      const result = data && (data as rowType[]).flatMap(Object.keys);
      const uniqueKeys = [...new Set(result)];
      settableHeaders(
        uniqueKeys.map((label, _) => {
          return { field: label, fieldHeader: humanize(label) };
        })
      );
    };
    if (typeof columns === 'string') {
      settableHeaders(
        columns
          .split(' ')
          .map(
            (el): columnType => ({ field: el, fieldHeader: humanizeStr(el) })
          )
      );
    } else if (!columns) {
      generateColumns();
    } else {
      settableHeaders(columns);
    }
  }, [columns, data]);

  function paginateRow(arr: any, size: number) {
    let pages = [];
    while (arr.length > 0) {
      pages.push(arr.splice(0, size));
    }
    return pages;
  }

  useEffect(() => {
    const paginatedData = paginateRow([...data], pageSize);
    const paginatedDataLength = paginatedData.length - 1;
    setpages(paginatedData.length);
    settableRows(paginatedData[currentPage]);
    setisNextButtonDisabled(currentPage === paginatedDataLength);
    setisPrevButtonDisabled(currentPage === 0);
  }, [data, currentPage, pageSize]);

  const selectionHandler = (
    e: ChangeEvent<HTMLInputElement>,
    row: dataType
  ) => {
    if (e.currentTarget.checked) {
      setSelectedRows([...selectedRows, row] as dataType[]);
    } else {
      setSelectedRows([
        ...selectedRows.filter((sRow) => sRow !== row),
      ] as dataType[]);
    }
    setselectAllChecked(selectedRows === data);
  };

  useEffect(() => {
    getSelectedRow && getSelectedRow(selectedRows);
  }, [selectedRows, getSelectedRow]);

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
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setSelectedRows([...data]);
                      } else {
                        setSelectedRows([]);
                      }
                      setselectAllChecked(e.currentTarget.checked);
                    }}
                    type="checkbox"
                    placeholder="select"
                    checked={selectAllChecked}
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
                <tr key={`${currentPage}${i}`} data-testid="table-row">
                  {selectable && (
                    <td>
                      <input
                        onChange={(e) => selectionHandler(e, row)}
                        checked={selectedRows.includes(row)}
                        type="checkbox"
                        placeholder="select"
                      />
                    </td>
                  )}
                  {tableHeaders &&
                    tableHeaders.map((el, j) => {
                      return (
                        <td
                          key={`${currentPage}${i}${j}`}
                          data-testid="row-val"
                        >
                          {row[el.field] || row[j]}
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
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
          {'<<'}
        </button>
        <button
          disabled={isNextButtonDisabled}
          title="next page"
          onClick={() => setcurrentPage(currentPage + 1)}
        >
          {'>>'}
        </button>
      </div>
      <div>
        <ul>
          {Array.from(Array(pages).keys()).map((el, i) => (
            <li key={i}>
              <button title="page" onClick={() => setcurrentPage(el)}>
                {el + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ReactDataTableRDT;
