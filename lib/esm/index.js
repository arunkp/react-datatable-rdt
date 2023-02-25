import React from 'react';
const ReactDataTableRDT = ({ tableTitle, rows, columns, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, tableTitle),
        React.createElement("table", { "data-testid": "table" },
            React.createElement("thead", { "data-testid": "thead" }, columns.length > 0 && (React.createElement("tr", null, columns.map((el, i) => {
                return (React.createElement("th", { key: i, "data-testid": "col-name" }, el.field));
            })))),
            React.createElement("tbody", { "data-testid": "tbody" }, rows.map((row, i) => {
                return (React.createElement("tr", { key: i, "data-testid": "table-row" }, columns.map((el, j) => {
                    return (React.createElement("td", { key: `${i}.${j}`, "data-testid": "row-val" }, row[el.field]));
                })));
            })))));
};
export default ReactDataTableRDT;
