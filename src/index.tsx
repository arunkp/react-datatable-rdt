import React, { useEffect, useState, ChangeEvent } from 'react';
import useDebounce from './utils/useDebounce';
import humanizeStr from './utils/humanizeString';
import { Props, columnType, dataType, rowType } from './utils/PropTypes';
import './css/checkbox.css';
import './css/index.css';

const ReactDataTableRDT = ({
  tableTitle,
  data,
  selectable = false,
  columns,
  getSelectedRow,
  perPageSize = 5,
  paginated,
}: Props): JSX.Element => {
  const [tableHeaders, settableHeaders] = useState<columnType[]>();

  const [currentPage, setcurrentPage] = useState<number>(0);

  const [tableRows, settableRows] = useState<dataType[]>(
    paginated
      ? [
          ...paginated?.data.slice(
            currentPage * paginated?.skip,
            currentPage * paginated?.skip + paginated?.skip
          ),
        ]
      : data
  );
  const [pageSize] = useState<number>(paginated?.skip || perPageSize);
  const [pages, setpages] = useState<number | undefined>(
    (paginated ? Math.round(paginated?.total / paginated?.skip) : 3) ||
      undefined
  );
  const [selectAllChecked, setselectAllChecked] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<dataType[]>([]);
  const [isNextButtonDisabled, setisNextButtonDisabled] = useState<
    boolean | undefined
  >(false);

  const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState<
    boolean | undefined
  >(false);

  function paginateRow(arr: dataType[], size: number) {
    let pages = [];
    while (arr.length > 0) {
      pages.push(arr.splice(0, size));
    }
    return pages;
  }

  const pageData = useDebounce((paginated) => {
    if (paginated) {
      return settableRows([
        ...paginated?.data.slice(
          currentPage * paginated?.skip,
          currentPage * paginated?.skip + paginated?.skip
        ),
      ]);
    }
  }, 100);

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

  const nextButtonHandler = () => {
    setcurrentPage(currentPage + 1);
  };

  const prevButtonHandler = () => {
    setcurrentPage(currentPage - 1);
  };

  const pageNumberClickHandler = (el: number) => {
    setcurrentPage(el);
  };

  useEffect(() => {
    pageData(paginated);
  }, [paginated, pageData]);

  useEffect(() => {
    getSelectedRow && getSelectedRow(selectedRows);
  }, [selectedRows, getSelectedRow]);

  useEffect(() => {
    if (typeof columns === 'string') {
      settableHeaders(
        columns
          .split(' ')
          .map(
            (el): columnType => ({ field: el, fieldHeader: humanizeStr(el) })
          )
      );
    } else if (!columns) {
      const result = !paginated
        ? (data as rowType[]).flatMap(Object.keys)
        : (paginated.data as rowType[]).flatMap(Object.keys);
      const uniqueKeys = [...new Set(result)];
      settableHeaders(
        uniqueKeys.map((label, _) => {
          return { field: label, fieldHeader: humanizeStr(label) };
        })
      );
    } else {
      settableHeaders(columns);
    }
  }, [columns, data, paginated]);

  useEffect(() => {
    pages && setisPrevButtonDisabled(currentPage === 0);
    if (!paginated) {
      const paginatedData = paginateRow([...data], pageSize);
      setpages(paginatedData.length);
      settableRows(paginatedData[currentPage]);
      setisNextButtonDisabled(currentPage === paginatedData.length - 1);
    } else {
      pages && setisNextButtonDisabled(currentPage === pages - 1);
    }
  }, [data, currentPage, pageSize, paginated, pages]);

  return (
    <div className="rdt-wrapper">
      <div className="rdt-title">{tableTitle}</div>
      <div className="rdt-table">
        <table data-testid="table">
          <thead data-testid="thead">
            {
              <tr>
                {selectable && (
                  <th className="rdt-table-checkbox">
                    <label className="pure-material-checkbox">
                      <input
                        onChange={(e) => {
                          if (e.currentTarget.checked) {
                            setSelectedRows(
                              paginated ? [...paginated.data] : [...data]
                            );
                          } else {
                            setSelectedRows([]);
                          }
                          setselectAllChecked(e.currentTarget.checked);
                        }}
                        type="checkbox"
                        placeholder="select"
                        checked={selectAllChecked}
                      />
                      <span></span>
                    </label>
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
              tableRows.map(
                (row: rowType | (string | number | null)[], i: number) => {
                  return (
                    <tr key={`${currentPage}${i}`} data-testid="table-row">
                      {selectable && (
                        <td className="rdt-table-checkbox">
                          <label className="pure-material-checkbox">
                            <input
                              onChange={(e) => selectionHandler(e, row)}
                              checked={selectedRows.includes(row)}
                              type="checkbox"
                              placeholder="select"
                            />
                            <span></span>
                          </label>
                        </td>
                      )}
                      {tableHeaders &&
                        tableHeaders.map((el, j) => {
                          return (
                            <td
                              key={`${currentPage}${i}${j}`}
                              data-testid="row-val"
                            >
                              {(row as rowType)[el.field] ||
                                (row as (string | number | null)[])[j]}
                            </td>
                          );
                        })}
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
      <div className="rdt-page-options">
        {paginated ? (
          <div>
            Showing {`${currentPage * paginated?.skip}`} to{' '}
            {`${currentPage * paginated?.skip + paginated?.skip}`} of{' '}
            {`${paginated.total}`} entries
          </div>
        ) : (
          <div>
            Showing {perPageSize * currentPage} to{' '}
            {perPageSize * currentPage + perPageSize} from {data.length} entries
          </div>
        )}
        <div className="rdt-page-navigation">
          <button
            disabled={isPrevButtonDisabled}
            title="prev page"
            onClick={prevButtonHandler}
          >
            Prev
          </button>
          <div className="rdt-pages">
            <ul>
              {Array.from(Array(pages).keys()).map((el, i) => (
                <li key={i}>
                  <button
                    title="page"
                    onClick={() => pageNumberClickHandler(el)}
                  >
                    {el + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            disabled={isNextButtonDisabled}
            title="next page"
            onClick={nextButtonHandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactDataTableRDT;
