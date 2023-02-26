import React, { useRef, useEffect, useState } from 'react';
import useDebounce from './utils/useDebounce';
import humanizeStr from './utils/humanizeString';
import humanize from './utils/humanizeString';
const ReactDataTableRDT = ({ tableTitle, data, selectable = false, columns, rowsPerPageOptions = [5, 10, 20], }) => {
    const inputEls = useRef([]);
    const selectAllRef = useRef(null);
    const [tableHeaders, settableHeaders] = useState();
    const [tableRows, settableRows] = useState();
    const [currentPage, setcurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [isNextButtonDisabled, setisNextButtonDisabled] = useState(false);
    const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState(false);
    useEffect(() => {
        if (typeof columns === 'string') {
            settableHeaders(columns
                .split(' ')
                .map((el) => ({ field: el, fieldHeader: humanizeStr(el) })));
        }
        else {
            settableHeaders(columns);
        }
        if (!columns) {
            generateColumns();
        }
    }, [columns]);
    function paginateRow(arr, size) {
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
        inputEls.current.map((inputEl) => {
            inputEl.checked = selectAllRef.current.checked;
            return inputEl;
        });
    }, 300);
    const generateColumns = () => {
        const result = data && data.flatMap(Object.keys);
        const uniqueKeys = [...new Set(result)];
        settableHeaders(uniqueKeys.map((label) => {
            return { field: label, fieldHeader: humanize(label) };
        }));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, tableTitle),
        React.createElement("table", { "data-testid": "table" },
            React.createElement("thead", { "data-testid": "thead" }, React.createElement("tr", null,
                selectable && (React.createElement("th", null,
                    React.createElement("input", { onChange: changeHandler, type: "checkbox", placeholder: "select", ref: selectAllRef }))),
                tableHeaders &&
                    tableHeaders.map((el, i) => {
                        return (React.createElement("th", { key: `col-${el.field}-${i}`, "data-testid": "col-name" }, el.fieldHeader || el.field));
                    }))),
            React.createElement("tbody", { "data-testid": "tbody" }, tableRows &&
                tableRows.map((row, i) => {
                    return (React.createElement("tr", { key: `row--${i}`, "data-testid": "table-row" },
                        selectable && (React.createElement("td", null,
                            React.createElement("input", { ref: (el) => (inputEls.current[i] = el), type: "checkbox", placeholder: "select" }))),
                        tableHeaders &&
                            tableHeaders.map((el, j) => {
                                return (React.createElement("td", { key: `row-${el}-${i}-${j}`, "data-testid": "row-val" }, row[el.field] || row[j]));
                            })));
                }))),
        React.createElement("select", { title: "Per Page", onChange: (e) => {
                setPageSize(Number(e.currentTarget.value));
            } }, rowsPerPageOptions.map((rowSize, i) => {
            return (React.createElement("option", { key: i, value: rowSize }, rowSize));
        })),
        React.createElement("button", { disabled: isPrevButtonDisabled, title: "prev page", onClick: () => setcurrentPage(currentPage - 1) }, "Prev Page"),
        React.createElement("button", { disabled: isNextButtonDisabled, title: "next page", onClick: () => setcurrentPage(currentPage + 1) }, "Next Page")));
};
export default ReactDataTableRDT;
