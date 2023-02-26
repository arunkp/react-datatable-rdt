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
require("./css/checkbox.css");
require("./css/index.css");
const ReactDataTableRDT = ({ tableTitle, data, selectable = false, columns, getSelectedRow, perPageSize = 5, paginated, }) => {
    const [tableHeaders, settableHeaders] = (0, react_1.useState)();
    const [currentPage, setcurrentPage] = (0, react_1.useState)(0);
    const [tableRows, settableRows] = (0, react_1.useState)(paginated
        ? [
            ...paginated === null || paginated === void 0 ? void 0 : paginated.data.slice(currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip), currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip) + (paginated === null || paginated === void 0 ? void 0 : paginated.skip)),
        ]
        : data);
    const [pageSize] = (0, react_1.useState)((paginated === null || paginated === void 0 ? void 0 : paginated.skip) || perPageSize);
    const [pages, setpages] = (0, react_1.useState)((paginated ? Math.round((paginated === null || paginated === void 0 ? void 0 : paginated.total) / (paginated === null || paginated === void 0 ? void 0 : paginated.skip)) : 3) ||
        undefined);
    const [selectAllChecked, setselectAllChecked] = (0, react_1.useState)(false);
    const [selectedRows, setSelectedRows] = (0, react_1.useState)([]);
    const [isNextButtonDisabled, setisNextButtonDisabled] = (0, react_1.useState)(false);
    const [isPrevButtonDisabled, setisPrevButtonDisabled] = (0, react_1.useState)(false);
    function paginateRow(arr, size) {
        let pages = [];
        while (arr.length > 0) {
            pages.push(arr.splice(0, size));
        }
        return pages;
    }
    const pageData = (0, useDebounce_1.default)((paginated) => {
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
    (0, react_1.useEffect)(() => {
        pageData(paginated);
    }, [paginated, pageData]);
    (0, react_1.useEffect)(() => {
        getSelectedRow && getSelectedRow(selectedRows);
    }, [selectedRows, getSelectedRow]);
    (0, react_1.useEffect)(() => {
        if (typeof columns === 'string') {
            settableHeaders(columns
                .split(' ')
                .map((el) => ({ field: el, fieldHeader: (0, humanizeString_1.default)(el) })));
        }
        else if (!columns) {
            const result = !paginated
                ? data.flatMap(Object.keys)
                : paginated.data.flatMap(Object.keys);
            const uniqueKeys = [...new Set(result)];
            settableHeaders(uniqueKeys.map((label, _) => {
                return { field: label, fieldHeader: (0, humanizeString_2.default)(label) };
            }));
        }
        else {
            settableHeaders(columns);
        }
    }, [columns, data, paginated]);
    (0, react_1.useEffect)(() => {
        if (!paginated) {
            const paginatedData = paginateRow([...data], pageSize);
            const paginatedDataLength = paginatedData.length - 1;
            setpages(paginatedData.length);
            settableRows(paginatedData[currentPage]);
            setisNextButtonDisabled(currentPage === paginatedDataLength);
            setisPrevButtonDisabled(currentPage === 0);
        }
    }, [data, currentPage, pageSize, paginated]);
    return (react_1.default.createElement("div", { className: "rdt-wrapper" },
        react_1.default.createElement("div", { className: "rdt-title" }, tableTitle),
        react_1.default.createElement("div", { className: "rdt-table" },
            react_1.default.createElement("table", { "data-testid": "table" },
                react_1.default.createElement("thead", { "data-testid": "thead" }, react_1.default.createElement("tr", null,
                    selectable && (react_1.default.createElement("th", { className: "rdt-table-checkbox" },
                        react_1.default.createElement("label", { className: "pure-material-checkbox" },
                            react_1.default.createElement("input", { onChange: (e) => {
                                    if (e.currentTarget.checked) {
                                        setSelectedRows(paginated ? [...paginated.data] : [...data]);
                                    }
                                    else {
                                        setSelectedRows([]);
                                    }
                                    setselectAllChecked(e.currentTarget.checked);
                                }, type: "checkbox", placeholder: "select", checked: selectAllChecked }),
                            react_1.default.createElement("span", null)))),
                    tableHeaders &&
                        tableHeaders.map((el, i) => {
                            return (react_1.default.createElement("th", { key: `col-${el.field}-${i}`, "data-testid": "col-name" }, el.fieldHeader || el.field));
                        }))),
                react_1.default.createElement("tbody", { "data-testid": "tbody" }, tableRows &&
                    tableRows.map((row, i) => {
                        return (react_1.default.createElement("tr", { key: `${currentPage}${i}`, "data-testid": "table-row" },
                            selectable && (react_1.default.createElement("td", { className: "rdt-table-checkbox" },
                                react_1.default.createElement("label", { className: "pure-material-checkbox" },
                                    react_1.default.createElement("input", { onChange: (e) => selectionHandler(e, row), checked: selectedRows.includes(row), type: "checkbox", placeholder: "select" }),
                                    react_1.default.createElement("span", null)))),
                            tableHeaders &&
                                tableHeaders.map((el, j) => {
                                    return (react_1.default.createElement("td", { key: `${currentPage}${i}${j}`, "data-testid": "row-val" }, row[el.field] ||
                                        row[j]));
                                })));
                    })))),
        react_1.default.createElement("div", { className: "rdt-page-options" },
            paginated ? (react_1.default.createElement("div", null,
                "Showing ",
                `${currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip)}`,
                " to",
                ' ',
                `${currentPage * (paginated === null || paginated === void 0 ? void 0 : paginated.skip) + (paginated === null || paginated === void 0 ? void 0 : paginated.skip)}`,
                " of",
                ' ',
                `${paginated.total}`,
                " entries")) : (react_1.default.createElement("div", null,
                "Showing $",
                perPageSize * currentPage,
                " to $",
                perPageSize * currentPage + perPageSize,
                " from $",
                data.length,
                "entries")),
            react_1.default.createElement("div", { className: "rdt-page-navigation" },
                react_1.default.createElement("button", { disabled: isPrevButtonDisabled, title: "prev page", onClick: prevButtonHandler }, "Prev"),
                react_1.default.createElement("div", { className: "rdt-pages" },
                    react_1.default.createElement("ul", null, Array.from(Array(pages).keys()).map((el, i) => (react_1.default.createElement("li", { key: i },
                        react_1.default.createElement("button", { title: "page", onClick: () => pageNumberClickHandler(el) }, el + 1)))))),
                react_1.default.createElement("button", { disabled: isNextButtonDisabled, title: "next page", onClick: nextButtonHandler }, "Next")))));
};
exports.default = ReactDataTableRDT;
