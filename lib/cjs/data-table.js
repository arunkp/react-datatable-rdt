"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const useDebounce_1 = __importDefault(require("./utils/useDebounce"));
const ReactDataTableRDT = ({ tableTitle, rows, columns, selectable = false, }) => {
    const inputEls = (0, react_1.useRef)([]);
    const selectAllRef = (0, react_1.useRef)(null);
    const getColumns = () => {
        return typeof columns === 'string'
            ? columns
                .split(' ')
                .map((el) => ({ field: el, fieldHeader: el }))
            : columns;
    };
    const changeHandler = (0, useDebounce_1.default)(() => {
        inputEls.current.map((inputEl) => {
            inputEl.checked = selectAllRef.current.checked;
            return inputEl;
        });
    }, 300);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, tableTitle),
        react_1.default.createElement("table", { "data-testid": "table" },
            react_1.default.createElement("thead", { "data-testid": "thead" }, (columns === null || columns === void 0 ? void 0 : columns.length) > 0 && (react_1.default.createElement("tr", null,
                selectable && (react_1.default.createElement("th", null,
                    react_1.default.createElement("input", { onChange: changeHandler, type: "checkbox", placeholder: "select", ref: selectAllRef }))),
                getColumns().map((el, i) => {
                    return (react_1.default.createElement("th", { key: `col-${el.field}-${i}`, "data-testid": "col-name" }, el.field));
                })))),
            react_1.default.createElement("tbody", { "data-testid": "tbody" }, (columns === null || columns === void 0 ? void 0 : columns.length) > 0 &&
                rows.map((row, i) => {
                    return (react_1.default.createElement("tr", { key: `row-${row}-${i}`, "data-testid": "table-row" },
                        selectable && (react_1.default.createElement("td", null,
                            react_1.default.createElement("input", { ref: (el) => (inputEls.current[i] = el), type: "checkbox", placeholder: "select" }))),
                        getColumns().map((el, j) => {
                            return (react_1.default.createElement("td", { key: `row-${el}-${i}-${j}`, "data-testid": "row-val" }, row[el.field]));
                        })));
                })))));
};
exports.default = ReactDataTableRDT;
