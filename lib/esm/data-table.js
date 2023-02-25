import React, { useRef } from 'react';
import useDebounce from './utils/useDebounce';
const ReactDataTableRDT = ({ tableTitle, rows, columns, selectable = false, }) => {
    const inputEls = useRef([]);
    const selectAllRef = useRef(null);
    const getColumns = () => {
        return typeof columns === 'string'
            ? columns
                .split(' ')
                .map((el) => ({ field: el, fieldHeader: el }))
            : columns;
    };
    const changeHandler = useDebounce(() => {
        inputEls.current.map((inputEl) => {
            inputEl.checked = selectAllRef.current.checked;
            return inputEl;
        });
    }, 300);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, tableTitle),
        React.createElement("table", { "data-testid": "table" },
            React.createElement("thead", { "data-testid": "thead" }, (columns === null || columns === void 0 ? void 0 : columns.length) > 0 && (React.createElement("tr", null,
                selectable && (React.createElement("th", null,
                    React.createElement("input", { onChange: changeHandler, type: "checkbox", placeholder: "select", ref: selectAllRef }))),
                getColumns().map((el, i) => {
                    return (React.createElement("th", { key: `col-${el.field}-${i}`, "data-testid": "col-name" }, el.field));
                })))),
            React.createElement("tbody", { "data-testid": "tbody" }, (columns === null || columns === void 0 ? void 0 : columns.length) > 0 &&
                rows.map((row, i) => {
                    return (React.createElement("tr", { key: `row-${row}-${i}`, "data-testid": "table-row" },
                        selectable && (React.createElement("td", null,
                            React.createElement("input", { ref: (el) => (inputEls.current[i] = el), type: "checkbox", placeholder: "select" }))),
                        getColumns().map((el, j) => {
                            return (React.createElement("td", { key: `row-${el}-${i}-${j}`, "data-testid": "row-val" }, row[el.field]));
                        })));
                })))));
};
export default ReactDataTableRDT;
