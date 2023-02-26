import React, { useEffect, useState } from 'react';
import useDebounce from './utils/useDebounce';
import humanizeStr from './utils/humanizeString';
import './css/checkbox.css';
import './css/index.css';
const ReactDataTableRDT = ({ tableTitle, data, selectable = false, columns, getSelectedRow, perPageSize = 5, paginated, }) => {
    const [tableHeaders, settableHeaders] = useState();
    const [currentPage, setcurrentPage] = useState(0);
    const [tableRows, settableRows] = useState(paginated
        ? [
            ...paginated === null || paginated === void 0 ? void 0 : paginated.data.slice(currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip), currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip) + (paginated === null || paginated === void 0 ? void 0 : paginated.skip)),
        ]
        : data);
    const [pageSize] = useState((paginated === null || paginated === void 0 ? void 0 : paginated.skip) || perPageSize);
    const [pages, setpages] = useState((paginated ? Math.round((paginated === null || paginated === void 0 ? void 0 : paginated.total) / (paginated === null || paginated === void 0 ? void 0 : paginated.skip)) : 3) ||
        undefined);
    const [selectAllChecked, setselectAllChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isNextButtonDisabled, setisNextButtonDisabled] = useState(false);
    const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState(false);
    function paginateRow(arr, size) {
        let pages = [];
        while (arr.length > 0) {
            pages.push(arr.splice(0, size));
        }
        return pages;
    }
    const pageData = useDebounce((paginated) => {
        if (paginated) {
            return settableRows([
                ...paginated === null || paginated === void 0 ? void 0 : paginated.data.slice(currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip), currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip) + (paginated === null || paginated === void 0 ? void 0 : paginated.skip)),
            ]);
        }
    }, 100);
    const selectionHandler = (e, row) => {
        if (e.currentTarget.checked) {
            setSelectedRows([...selectedRows, row]);
        }
        else {
            setSelectedRows([
                ...selectedRows.filter((sRow) => sRow !== row),
            ]);
        }
        setselectAllChecked(selectedRows === data);
    };
    const nextButtonHandler = () => {
        setcurrentPage(currentPage + 1);
    };
    const prevButtonHandler = () => {
        setcurrentPage(currentPage - 1);
    };
    const pageNumberClickHandler = (el) => {
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
            settableHeaders(columns
                .split(' ')
                .map((el) => ({ field: el, fieldHeader: humanizeStr(el) })));
        }
        else if (!columns) {
            const result = !paginated
                ? data.flatMap(Object.keys)
                : paginated.data.flatMap(Object.keys);
            const uniqueKeys = [...new Set(result)];
            settableHeaders(uniqueKeys.map((label, _) => {
                return { field: label, fieldHeader: humanizeStr(label) };
            }));
        }
        else {
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
        }
        else {
            pages && setisNextButtonDisabled(currentPage === pages - 1);
        }
    }, [data, currentPage, pageSize, paginated, pages]);
    return (React.createElement("div", { className: "rdt-wrapper" },
        React.createElement("div", { className: "rdt-title" }, tableTitle),
        React.createElement("div", { className: "rdt-table" },
            React.createElement("table", { "data-testid": "table" },
                React.createElement("thead", { "data-testid": "thead" }, React.createElement("tr", null,
                    selectable && (React.createElement("th", { className: "rdt-table-checkbox" },
                        React.createElement("label", { className: "pure-material-checkbox" },
                            React.createElement("input", { onChange: (e) => {
                                    if (e.currentTarget.checked) {
                                        setSelectedRows(paginated ? [...paginated.data] : [...data]);
                                    }
                                    else {
                                        setSelectedRows([]);
                                    }
                                    setselectAllChecked(e.currentTarget.checked);
                                }, type: "checkbox", placeholder: "select", checked: selectAllChecked }),
                            React.createElement("span", null)))),
                    tableHeaders &&
                        tableHeaders.map((el, i) => {
                            return (React.createElement("th", { key: `col-${el.field}-${i}`, "data-testid": "col-name" }, el.fieldHeader || el.field));
                        }))),
                React.createElement("tbody", { "data-testid": "tbody" }, tableRows &&
                    tableRows.map((row, i) => {
                        return (React.createElement("tr", { key: `${currentPage}${i}`, "data-testid": "table-row" },
                            selectable && (React.createElement("td", { className: "rdt-table-checkbox" },
                                React.createElement("label", { className: "pure-material-checkbox" },
                                    React.createElement("input", { onChange: (e) => selectionHandler(e, row), checked: selectedRows.includes(row), type: "checkbox", placeholder: "select" }),
                                    React.createElement("span", null)))),
                            tableHeaders &&
                                tableHeaders.map((el, j) => {
                                    return (React.createElement("td", { key: `${currentPage}${i}${j}`, "data-testid": "row-val" }, row[el.field] ||
                                        row[j]));
                                })));
                    })))),
        React.createElement("div", { className: "rdt-page-options" },
            paginated ? (React.createElement("div", null,
                "Showing ",
                `${currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip)}`,
                " to",
                ' ',
                `${currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip) + (paginated === null || paginated === void 0 ? void 0 : paginated.skip)}`,
                " of",
                ' ',
                `${paginated.total}`,
                " entries")) : (React.createElement("div", null,
                "Showing ",
                perPageSize * currentPage,
                " to",
                ' ',
                perPageSize * currentPage + perPageSize,
                " from ",
                data.length,
                " entries")),
            React.createElement("div", { className: "rdt-page-navigation" },
                React.createElement("button", { disabled: isPrevButtonDisabled, title: "prev page", onClick: prevButtonHandler }, "Prev"),
                React.createElement("div", { className: "rdt-pages" },
                    React.createElement("ul", null, Array.from(Array(pages).keys()).map((el, i) => (React.createElement("li", { key: i },
                        React.createElement("button", { title: "page", onClick: () => pageNumberClickHandler(el) }, el + 1)))))),
                React.createElement("button", { disabled: isNextButtonDisabled, title: "next page", onClick: nextButtonHandler }, "Next")))));
};
export default ReactDataTableRDT;
