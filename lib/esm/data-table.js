import React, { useRef, useEffect, useState } from 'react';
import useDebounce from './utils/useDebounce';
const ReactDataTableRDT = ({ tableTitle, data, selectable = false, 
// columns,
rowsPerPageOptions = [5, 10, 20], }) => {
    const inputEls = useRef([]);
    const selectAllRef = useRef(null);
    // const [tableHeaders, settableHeaders] = useState<columnType[]>();
    // const [tableRows, settableRows] = useState<rowType[] | string[][]>();
    const [currentPage, setcurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [isNextButtonDisabled, setisNextButtonDisabled] = useState(false);
    // useEffect(() => {
    //   if (typeof columns === 'string') {
    //     settableHeaders(
    //       columns
    //         .split(' ')
    //         .map(
    //           (el): columnType => ({ field: el, fieldHeader: humanizeStr(el) })
    //         )
    //     );
    //   }
    // }, [columns]);
    function paginateRow(arr, size) {
        let pages = [];
        while (arr.length > 0) {
            pages.push(arr.splice(0, size));
        }
        return pages;
    }
    useEffect(() => {
        // let onlyRows;
        // settableHeaders([
        //   { field: 'id', fieldHeader: 'Id' },
        //   { field: 'name', fieldHeader: 'Name' },
        // ]);
        console.log('data', data);
        const paginatedData = paginateRow(data, pageSize);
        console.log('paginatedData', paginatedData);
        // settableRows(paginatedData[currentPage]);
        setisNextButtonDisabled(currentPage >= paginatedData.length - 2);
    }, [data]);
    const changeHandler = useDebounce(() => {
        inputEls.current.map((inputEl) => {
            inputEl.checked = selectAllRef.current.checked;
            return inputEl;
        });
    }, 300);
    const getColumns = () => {
        // if (!columns) {
        // onlyRows = data;
        const result = data && data.flatMap(Object.keys);
        console.log('result', result);
        const uniqueKeys = [...new Set(result)];
        return uniqueKeys;
        // }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, tableTitle),
        React.createElement("table", { "data-testid": "table" },
            React.createElement("thead", { "data-testid": "thead" }, React.createElement("tr", null, selectable && (React.createElement("th", null,
                React.createElement("input", { onChange: changeHandler, type: "checkbox", placeholder: "select", ref: selectAllRef }))))),
            React.createElement("tbody", { "data-testid": "tbody" }, data.map((row, i) => {
                return (React.createElement("tr", { key: `row-${row}-${i}`, "data-testid": "table-row" },
                    selectable && (React.createElement("td", null,
                        React.createElement("input", { ref: (el) => (inputEls.current[i] = el), type: "checkbox", placeholder: "select" }))),
                    getColumns().map((el, j) => {
                        return (React.createElement("td", { key: `row-${el}-${i}-${j}`, "data-testid": "row-val" }, el));
                    })));
            }))),
        React.createElement("select", { title: "Per Page", onChange: (e) => {
                setPageSize(Number(e.currentTarget.value));
            } }, rowsPerPageOptions.map((rowSize, i) => {
            return (React.createElement("option", { key: i, value: rowSize }, rowSize));
        })),
        React.createElement("button", { disabled: isNextButtonDisabled, title: "next page", onClick: () => setcurrentPage(currentPage + 1) }, "Next Page")));
};
export default ReactDataTableRDT;
