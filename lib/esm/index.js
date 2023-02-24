import React from 'react';
const ReactDataTableRDT = ({ tableTitle, rows, columns, }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, tableTitle),
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null, columns.map((el) => {
                    return React.createElement("th", null, el.field);
                }))),
            React.createElement("tbody", null, rows.map((row) => {
                return (React.createElement("tr", null, columns.map((el) => {
                    return React.createElement("td", null, row[el.field]);
                })));
            })))));
};
export default ReactDataTableRDT;
