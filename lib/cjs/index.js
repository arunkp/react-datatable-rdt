"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ReactDataTableRDT = ({ tableTitle, rows, columns, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, tableTitle),
        react_1.default.createElement("table", { "data-testid": "table" },
            react_1.default.createElement("thead", { "data-testid": "thead" }, columns.length > 0 && (react_1.default.createElement("tr", null, columns.map((el, i) => {
                return (react_1.default.createElement("th", { key: i, "data-testid": "col-name" }, el.field));
            })))),
            react_1.default.createElement("tbody", { "data-testid": "tbody" }, rows.map((row, i) => {
                return (react_1.default.createElement("tr", { key: i, "data-testid": "table-row" }, columns.map((el, j) => {
                    return (react_1.default.createElement("td", { key: `${i}.${j}`, "data-testid": "row-val" }, row[el.field]));
                })));
            })))));
};
exports.default = ReactDataTableRDT;
