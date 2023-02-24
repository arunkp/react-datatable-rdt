"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ReactDataTableRDT = ({ tableTitle, rows, columns, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, tableTitle),
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null, columns.map((el) => {
                    return react_1.default.createElement("th", null, el.field);
                }))),
            react_1.default.createElement("tbody", null, rows.map((row) => {
                return (react_1.default.createElement("tr", null, columns.map((el) => {
                    return react_1.default.createElement("td", null, row[el.field]);
                })));
            })))));
};
exports.default = ReactDataTableRDT;
