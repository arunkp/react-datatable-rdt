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
const humanizeString_1 = __importDefault(require("./utils/humanizeString"));
const humanizeString_2 = __importDefault(require("./utils/humanizeString"));
const ReactDataTableRDT = ({ tableTitle, data, selectable = false, columns, rowsPerPageOptions = [5, 10, 20], }) => {
    const inputEls = (0, react_1.useRef)([]);
    const selectAllRef = (0, react_1.useRef)(null);
    const [tableHeaders, settableHeaders] = (0, react_1.useState)();
    const [tableRows, settableRows] = (0, react_1.useState)();
    const [currentPage, setcurrentPage] = (0, react_1.useState)(0);
    const [pageSize, setPageSize] = (0, react_1.useState)(5);
    const [isNextButtonDisabled, setisNextButtonDisabled] = (0, react_1.useState)(false);
    const [isPrevButtonDisabled, setisPrevButtonDisabled] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (typeof columns === 'string') {
            settableHeaders(columns
                .split(' ')
                .map((el) => ({ field: el, fieldHeader: (0, humanizeString_1.default)(el) })));
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
    (0, react_1.useEffect)(() => {
        generateColumns();
        const paginatedData = paginateRow([...data], pageSize);
        const paginatedDataLength = paginatedData.length;
        settableRows(paginatedData[currentPage]);
        setisNextButtonDisabled(currentPage === paginatedDataLength);
        setisPrevButtonDisabled(currentPage === 0);
    }, [data, currentPage, pageSize]);
    const changeHandler = (0, useDebounce_1.default)(() => {
        inputEls.current.map((inputEl) => {
            inputEl.checked = selectAllRef.current.checked;
            return inputEl;
        });
    }, 300);
    const generateColumns = () => {
        const result = data && data.flatMap(Object.keys);
        const uniqueKeys = [...new Set(result)];
        settableHeaders(uniqueKeys.map((label) => {
            return { field: label, fieldHeader: (0, humanizeString_2.default)(label) };
        }));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, tableTitle),
        react_1.default.createElement("table", { "data-testid": "table" },
            react_1.default.createElement("thead", { "data-testid": "thead" }, react_1.default.createElement("tr", null,
                selectable && (react_1.default.createElement("th", null,
                    react_1.default.createElement("input", { onChange: changeHandler, type: "checkbox", placeholder: "select", ref: selectAllRef }))),
                tableHeaders &&
                    tableHeaders.map((el, i) => {
                        return (react_1.default.createElement("th", { key: `col-${el.field}-${i}`, "data-testid": "col-name" }, el.fieldHeader || el.field));
                    }))),
            react_1.default.createElement("tbody", { "data-testid": "tbody" }, tableRows &&
                tableRows.map((row, i) => {
                    return (react_1.default.createElement("tr", { key: `row--${i}`, "data-testid": "table-row" },
                        selectable && (react_1.default.createElement("td", null,
                            react_1.default.createElement("input", { ref: (el) => (inputEls.current[i] = el), type: "checkbox", placeholder: "select" }))),
                        tableHeaders &&
                            tableHeaders.map((el, j) => {
                                return (react_1.default.createElement("td", { key: `row-${el}-${i}-${j}`, "data-testid": "row-val" }, row[el.field] || row[j]));
                            })));
                }))),
        react_1.default.createElement("select", { title: "Per Page", onChange: (e) => {
                setPageSize(Number(e.currentTarget.value));
            } }, rowsPerPageOptions.map((rowSize, i) => {
            return (react_1.default.createElement("option", { key: i, value: rowSize }, rowSize));
        })),
        react_1.default.createElement("button", { disabled: isPrevButtonDisabled, title: "prev page", onClick: () => setcurrentPage(currentPage - 1) }, "Prev Page"),
        react_1.default.createElement("button", { disabled: isNextButtonDisabled, title: "next page", onClick: () => setcurrentPage(currentPage + 1) }, "Next Page")));
};
exports.default = ReactDataTableRDT;
