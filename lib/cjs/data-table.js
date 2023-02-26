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
const ReactDataTableRDT = ({ tableTitle, data, selectable = false, 
// columns,
rowsPerPageOptions = [5, 10, 20], }) => {
    const inputEls = (0, react_1.useRef)([]);
    const selectAllRef = (0, react_1.useRef)(null);
    // const [tableHeaders, settableHeaders] = useState<columnType[]>();
    // const [tableRows, settableRows] = useState<rowType[] | string[][]>();
    const [currentPage, setcurrentPage] = (0, react_1.useState)(0);
    const [pageSize, setPageSize] = (0, react_1.useState)(5);
    const [isNextButtonDisabled, setisNextButtonDisabled] = (0, react_1.useState)(false);
    // useEffect(() => {
    //   if (typeof columns === 'string') {
    //     settableHeaders(
    //       columns
    //         .split(' ')
    //         .map(
    //           (el): columnType => ({ field: el, fieldHeader: humanizeStr(el) })
    //         )
    //     );
    //   }
    // }, [columns]);
    function paginateRow(arr, size) {
        let pages = [];
        while (arr.length > 0) {
            pages.push(arr.splice(0, size));
        }
        return pages;
    }
    (0, react_1.useEffect)(() => {
        // let onlyRows;
        // settableHeaders([
        //   { field: 'id', fieldHeader: 'Id' },
        //   { field: 'name', fieldHeader: 'Name' },
        // ]);
        console.log('data', data);
        const paginatedData = paginateRow(data, pageSize);
        console.log('paginatedData', paginatedData);
        // settableRows(paginatedData[currentPage]);
        setisNextButtonDisabled(currentPage >= paginatedData.length - 2);
    }, [data]);
    const changeHandler = (0, useDebounce_1.default)(() => {
        inputEls.current.map((inputEl) => {
            inputEl.checked = selectAllRef.current.checked;
            return inputEl;
        });
    }, 300);
    const getColumns = () => {
        // if (!columns) {
        // onlyRows = data;
        const result = data && data.flatMap(Object.keys);
        console.log('result', result);
        const uniqueKeys = [...new Set(result)];
        return uniqueKeys;
        // }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, tableTitle),
        react_1.default.createElement("table", { "data-testid": "table" },
            react_1.default.createElement("thead", { "data-testid": "thead" }, react_1.default.createElement("tr", null, selectable && (react_1.default.createElement("th", null,
                react_1.default.createElement("input", { onChange: changeHandler, type: "checkbox", placeholder: "select", ref: selectAllRef }))))),
            react_1.default.createElement("tbody", { "data-testid": "tbody" }, data.map((row, i) => {
                return (react_1.default.createElement("tr", { key: `row-${row}-${i}`, "data-testid": "table-row" },
                    selectable && (react_1.default.createElement("td", null,
                        react_1.default.createElement("input", { ref: (el) => (inputEls.current[i] = el), type: "checkbox", placeholder: "select" }))),
                    getColumns().map((el, j) => {
                        return (react_1.default.createElement("td", { key: `row-${el}-${i}-${j}`, "data-testid": "row-val" }, el));
                    })));
            }))),
        react_1.default.createElement("select", { title: "Per Page", onChange: (e) => {
                setPageSize(Number(e.currentTarget.value));
            } }, rowsPerPageOptions.map((rowSize, i) => {
            return (react_1.default.createElement("option", { key: i, value: rowSize }, rowSize));
        })),
        react_1.default.createElement("button", { disabled: isNextButtonDisabled, title: "next page", onClick: () => setcurrentPage(currentPage + 1) }, "Next Page")));
};
exports.default = ReactDataTableRDT;
